const UserdataLogin = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

// exports.signup = catchAsync(async (req, res) => {
//     const data = UserdataLogin.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         confirmPassword: req.body.confirmPassword
//     });
//     console.log(`hi`, data);
//     res.status(201).json({
//         statusCode: 201, //201 --> created a new resource
//         message: 'success',
//         data: {
//             data
//         }
//     });
// });    //async await perfect example


const signToken = id => {
    return jwt.sign({ id }, 'secret')
}

exports.users = catchAsync(async (req, res) => {

    let users = await UserdataLogin.find();
    // console.log(users);
    // res.send('success');
    res.status(200).json({
        // token:token,
        statusCode: 200,
        message: 'success',
        data: users
    });
});

exports.signup = catchAsync(async (req, res) => {

    let newUser = await UserdataLogin.create(req.body);

    const token = signToken(newUser._id);
    // { expiresIn: process.env.JWT_EXPIRESIN });
    // console.log(token);
    res.status(201).json({
        token: token,
        statusCode: 201, //201 --> created a new resource
        message: 'success',
        data: newUser
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // check if email is and password is existing 
    if (!email || !password) {
        return next(new AppError('please provide email and password!', 400))
    }
    // check if user exists && password is correct
    const user = await UserdataLogin.findOne({ email }).select('+password');
    const correct = await user.correctPassword(password, user.password)

    if (!user || !correct) {
        return next(new AppError('Incorrect email or password', 401));
    }
    // if above check pass send token to the client
    const token = signToken(user._id);
    res.status(200).json({
        statusCode: 200,
        status:'success',
        token: token,
        data: 'user exists',
        userDetails: {
            user
        }
    });

});

exports.user = catchAsync(async (req,res)=>{
    // let user = await UserdataLogin.findById
    // to do 
});