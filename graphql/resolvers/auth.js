const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleValidation = require('../../helpers/extractErrors');
const errorTypes = require('../errors/types/auth');
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

      return { ...result._doc, _id: result.id };
     
    } catch (err) {
      throw err;
    }
  },
  logIn: async ({logInInput}) => {
    try {
      const { username, email, password } = logInInput;
      
      const existingUser = await User.findOne(
        { $or:[ { username }, { email } ] }
      );

      if (!existingUser) {
        throw new Error(errorTypes.INVALID_CREDENTIALS);
      }

      const isEqual = await bcrypt.compare(password, existingUser.password);
      
      if (!isEqual) {
        throw new Error(errorTypes.INVALID_CREDENTIALS);
      }
      console.log(process.env.JWT_KEY);
      const token = jwt.sign(
        { userId: existingUser._id, email, username },
        process.env.JWT_KEY,
        {
          expiresIn: '1h'
        }
      );
        
      return { 
        _id: existingUser._id, 
        email: existingUser.email,
        username: existingUser.username,
        token
      };
    }
    catch (err) {
      throw err;
    }
  }
};