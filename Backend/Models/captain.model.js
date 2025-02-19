const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        minlength:[3, 'First name must be at least 3 characters long'],
    },
    lastname:{
        type: String,
        minlength:[3, 'Last name must be at least 3 characters long'],
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength:[5, 'email must be at least 5 characters long'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    socketId:{
        type:String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be atleast 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be atleast 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be one'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car','motorcycle','auto'],
        },
    },
    location: {
        lat:{
            type: Number,
        },
        long: {
            type: Number,
        },
    },
})