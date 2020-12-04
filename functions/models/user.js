const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'disabled'],
  },
  role: {
    type: String,
    default: 'staff',
    enum: ['staff', 'admin'],
  },
  full_name: {
    type: String,
    maxlength: 50,
  },
  gender: {
    type: String,
    default: 'female',
    enum: ['female', 'male', 'other'],
  },
  birthday: {
    type: String,
  },
  created_at: { type: Date, default: Date.now(), required: true },
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
