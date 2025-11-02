const { Schema, model } = require('mongoose');
const validator = require('validator');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: validator.isStrongPassword,
      message: 'Password is not strong enough',
    },
  },
  role: {
    type: String,
    enum: ['user', 'instructor', 'admin'],
    default: 'user',
  },
  profileImage: {
    type: String,
  },
},{timestamps:true});

module.exports = model('User', UserSchema);
