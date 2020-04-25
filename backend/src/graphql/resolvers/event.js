const Event = require('../../models/Event');
const User = require('../../models/User');
const { dateToString } = require('../../utils/helpers');

// ._doc means get the returned data from mongoose without the metadata, with only the relevant data
// _id is registered in the database in a MongoDB special type, so we need to convert it to a string

module.exports = {
  events: async () => {
    console.log('EVENTS');
    try {
      const events = await Event.find().populate('creator');
      console.log('result ', events);
      return events.map((event) => {
        return {
          ...event._doc,
          date: dateToString(event._doc.date)
        };
      });
    } catch (error) {
      throw error;
    }
  },

  createEvent: async (args, req) => {
    console.log('CREATE EVENT');
    // verify if the user is authenticated
    if (!req.isAuthenticated) throw new Error('User is unauthenticated.');

    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId
    });
    console.log('result ', event);

    try {
      const result = await event.save();

      const user = await User.findById(req.userId);
      if (!user) throw new Error('User not found.');

      user.createdEvents.push(event);
      await user.save();

      return {
        ...result._doc,
        date: dateToString(result._doc.date)
      };
    } catch (error) {
      throw error;
    }
  }
};
