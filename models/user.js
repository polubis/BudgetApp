const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username field is required'],
    minlength: [2, 'Username field must be at least 2 characters long'],
    maxlength: [25, 'The maximum username length cannot exceed 25 characters'],
    validate: {
      validator: function(v) {
        return /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(v);
      },
      message: ({value}) => `${value} is not a valid username!`
    },
    
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    minlength: [5, 'Email field must be at least 5 characters long'],
    maxlength: [254, 'The maximum email length cannot exceed 254 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    minlength: [8, 'Password field must be at least 8 characters long'],
    maxLength: [20, 'The maximum password length cannot exceed 20 characters'],
  }
});

module.exports = mongoose.model('User', userSchema);
