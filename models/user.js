const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');


const userLoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        unique: true,
        // validate: Joi.string().required()
    },
    email: {
        type: String,
        required: [true, 'A user must have a name'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: 8,
    }
});

userLoginSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
});

// userLoginSchema.methods.correctPassword = catchAsync(async function (newUserPassword, userPassword) {
//     return bcrypt.compare(newUserPassword, userPassword);
// });

userLoginSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const UserDataLogin = mongoose.model('userLogin', userLoginSchema);

module.exports = UserDataLogin;
