const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    creator: {
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

module.exports = model('event', eventSchema);
