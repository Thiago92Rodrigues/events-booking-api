const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
{
    event: {
        type: Schema.Types.ObjectId,
        ref: 'event',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
},
{
    timestamps: true
}
);

module.exports = model('booking', bookingSchema);
