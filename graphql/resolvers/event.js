const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent } = require('./util');

// ._doc means get the returned data from mongoose without the metadata, with only the relevant data
// _id is registered in the database in a MongoDB special type, so we need to convert it to a string

module.exports = {

    /**
     * This function returns all events registered in the database
     */
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (error) {
            throw error;
        }
    },

    /**
     * This function creates a new event and save it in the database
     */
    createEvent: async (args, req) => {
        // verify if the user is authenticated
        if (!req.isAuthenticated) throw new Error('User is unauthenticated.');

        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId,
        });

        try {
            const result = await event.save();
            let createdEvent = transformEvent(result);

            const user = await User.findById(req.userId);
            if (!user) throw new Error('User not found.');

            user.createdEvents.push(event);
            await user.save();

            return createdEvent;

        } catch (error) {
            throw error;
        }
    },

};