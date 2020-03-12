const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'event'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    // with the timestamps set as true, mongoose will automatically
    // create the columns `createdAt` and `updatedAt` in the database
    // for every entry of the schema
    timestamps: true
  }
);

module.exports = model('booking', bookingSchema);
