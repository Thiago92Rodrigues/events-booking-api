const { Schema, model } = require('mongoose');

const userSchema = new Schema(
{
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'event',
        }
    ]
});

module.exports = model('user', userSchema);
