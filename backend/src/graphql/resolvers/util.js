const DataLoader = require('dataloader');

const Event = require('../../models/Event');
const User = require('../../models/User');
const { dateToString } = require('../../utils/helpers');

const eventLoader = new DataLoader((eventIds) => {
  return fetchEvents(eventIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const fetchEvents = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.sort((x, y) => {
      return (
        eventIds.indexOf(x._id.toString()) - eventIds.indexOf(y._id.toString())
      );
    });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (error) {
    throw error;
  }
};

const fetchUser = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
    };
  } catch (error) {
    throw error;
  }
};

const fetchSingleEvent = async (eventId) => {
  try {
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (error) {
    throw error;
  }
};

/**
 * This function prepares a proper return response for an event object
 */
const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: fetchUser.bind(this, event.creator)
  };
};

/**
 * This function prepares a proper return response for a booking object
 */
const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: fetchUser.bind(this, booking._doc.user),
    event: fetchSingleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

module.exports = {
  transformEvent,
  transformBooking
};
