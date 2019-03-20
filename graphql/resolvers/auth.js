const bcrypt = require('bcryptjs');
const handleValidation = require('../../helpers/extractErrors');
const errorTypes = require('../errors/types/auth');
// const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createAccount: async ({userInput}) => {
    try {
      const user = new User({
        ...userInput
      });

      await handleValidation(user);
      
      const existingUser = await User.findOne(
        { $or:[ { username: user.username }, { email: user.email } ] }
      );

      if (existingUser) {
        throw new Error(errorTypes.USER_EXISTS);
      }

      const hashedPassword = await bcrypt.hash(user.password, 12);

      user.password = hashedPassword;

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
     
    } catch (err) {
      throw err;
    }
  }
};