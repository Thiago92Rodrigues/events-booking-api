const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      // remove any white spaces from the user input
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createdEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'event'
      }
    ]
  },
  {
    // with the timestamps set as true, mongoose will automatically
    // create the columns `createdAt` and `updatedAt` in the database
    // for every entry of the schema
    timestamps: true
  }
);

module.exports = model('user', userSchema);
