const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator')

const userDetails = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator:validator.isEmail,
            message: "Invalid is email"
        }
    },
    password: {
        type: String,
        required: true,
        validate:{
            validator:validator.isStrongPassword,
            message:"Invalid password"
        }

    },
    image:{
        type:String,
    }
})
module.exports = mongoose.model("User",userDetails)



