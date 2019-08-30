const mongoose = require('mongoose');

const detail = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        unique: true,
        // validate: Joi.string().required()
    },
    gender: {
        type: String,
        required: [true, 'A user must fill gender'],
        unique: false
    },
    address: {
        type: String,
        required: [true, 'User must fill the address'],
        unique: false
    },
    rating: {
        type: Number,
        // required: [false, 'User must have rating'],
        default: 4.0
    },
    mobile: {
        type: String || Number,
        required: [true, 'Every user must have a unique mobile number'],
        unique: true
    }
});

const UserData = mongoose.model('user', detail);

module.exports = UserData;