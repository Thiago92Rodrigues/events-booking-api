const Booking = require('../../models/Booking');
const Event = require('../../models/Event');
const { dateToString } = require('../../utils/helpers');

module.exports = {
  bookings: async (args, req) => {
    console.log('BOOKINGS');
    // verify if the user is authenticated
    if (!req.isAuthenticated) throw new Error('User is unauthenticated.');

    try {
      const bookings = await Booking.find({ user: req.userId })
        .populate('event')
        .populate('user');
      console.log('result ', bookings);
      return bookings.map((booking) => {
        return {
          ...booking._doc,
          createdAt: dateToString(booking._doc.createdAt),
          updatedAt: dateToString(booking._doc.updatedAt)
        };
      });
    } catch (error) {
      throw error;
    }
  },

  bookEvent: async (args, req) => {
    console.log('BOOK EVENT');
    // verify if the user is authenticated
    if (!req.isAuthenticated) throw new Error('User is unauthenticated.');

    try {
      const fetchedEvent = await Event.findById(args.eventId);
      const booking = new Booking({
        user: req.userId,
        event: fetchedEvent
      });
      console.log('result ', booking);
      const result = await booking.save();
      return {
        ...result._doc,
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
      };
    } catch (error) {
      throw error;
    }
  },

  cancelBooking: async (args, req) => {
    console.log('CANCEL BOOKING');
    // verify if the user is authenticated
    if (!req.isAuthenticated) throw new Error('User is unauthenticated.');

    try {
      await Booking.findByIdAndDelete(args.bookingId);
      return;
    } catch (error) {
      throw error;
    }
  }
};
