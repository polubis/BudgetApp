const mongoose = require("mongoose");
const errorTypes = require("../graphql/errors/types/auth");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, errorTypes.USERNAME_REQUIRED],
    minlength: [2, errorTypes.USERNAME_MIN_LENGTH],
    maxlength: [25, errorTypes.USERNAME_MAX_LENGTH]
  },
  email: {
    type: String,
    required: [true, errorTypes.EMAIL_REQUIRED],
    minlength: [5, errorTypes.EMAIL_MIN_LENGTH],
    maxlength: [254, errorTypes.EMAIL_MAX_LENGTH]
  },
  password: {
    type: String,
    required: [true, errorTypes.PASSWORD_REQUIRED],
    minlength: [8, errorTypes.PASSWORD_MIN_LENGTH],
    maxLength: [20, errorTypes.PASSWORD_MAX_LENGTH]
  }
});

module.exports = mongoose.model('User', userSchema);
