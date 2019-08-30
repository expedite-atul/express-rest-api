const UserData = require('../models/model');
const Joi = require('joi');
const catchAsync = require('../utils/catchAsync');


exports.validationRes = (req, res, next) => {
    const { error } = this.validator(req.body);
    if (error) {
        res.status(400).json(
            {
                "status": 400,
                "message": error.details[0].message
            }
        );
        return;
    }
    next();
}

exports.validator = function validateName(update) {
    const schema = {
        name: Joi.string().min(3).required(),
        gender: Joi.string().min(1).max(1).required(),
        address: Joi.string().required(),
        mobile: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required()
    };
    return Joi.validate(update, schema);
}

exports.getAllUsers = catchAsync(async (req, res) => {
    // const queryObj = { ...req.query };
    // const excludedFields = ['page','sort','limit','fields'];
    // excludedFields.forEach(el => delete~ queryObj[el]);
    // console.log(queryObj,excludedFields);
    // to do
    let userList = await UserData.find(req.query)
    res.status(200).json(
        {
            statusCode: 200,
            requestedAt: req.requestTime,
            message: 'success',
            result: userList.length,
            data: userList
        });

});

exports.postUsers = catchAsync(async (req, res) => {

    let newUser = await UserData.create(req.body);
    res.status(201).json({
        statusCode: 201, //201 --> created a new resource
        message: 'success',
        data: newUser
    });
});

exports.getUser = catchAsync(async (req, res) => {
    let userFound = await UserData.findById(req.params.id);
    res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: userFound
    });
}); //To do multiple operations

exports.update = catchAsync(async (req, res) => {
    let updatedData = await UserData.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: updatedData
    });
});

exports.deletes = catchAsync(async (req, res) => {
    let data = await UserData.findByIdAndDelete(req.params.id);
    res.status(204).json({
        statusCode: "204", // successfully deleted
        message: "success",
        data: data
    });

})
