const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator')

const userDetails = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: {
            validate:validator.isEmail,
            message: "Invalid is email"
        }
    },
    password: {
        type: String,
        required: true,
        validator:{
            validate:validator.isStrongPassword,
            message:"Invalid password"
        }

    }
})



