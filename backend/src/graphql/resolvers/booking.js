const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transformBooking, transformEvent } = require('./util');

module.exports = {
  /**
   * This function returns all bookings registered in the database
   */
  bookings: async (args, req) => {
    console.log('BOOKINGS');
    // verify if the user is authenticated
    if (!req.isAuthenticated) throw new Error('User is unauthenticated.');

    try {
      const bookings = await Booking.find({ user: req.userId });
      console.log('res ', bookings);
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * This function creates a new booking from an existing event
   */
  bookEvent: async (args, req) => {
    console.log('BOOK EVENT');
    // verify if the user is authenticated
    if (!req.isAuthenticated) throw new Error('User is unauthenticated.');

    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        user: req.userId,
        event: fetchedEvent
      });
      console.log('res ', booking);

      const result = await booking.save();
      return transformBooking(result);
    } catch (error) {
      throw error;
    }
  },

  /**
   * This function deletes an existing booking
   */
  cancelBooking: async (args, req) => {
    console.log('CANCEL BOOKING');
    // verify if the user is authenticated
    if (!req.isAuthenticated) throw new Error('User is unauthenticated.');

    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);

      await Booking.deleteOne({ _id: args.bookingId });

      return event;
    } catch (error) {
      throw error;
    }
  }
};
