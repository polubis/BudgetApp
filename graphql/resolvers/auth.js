const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleValidation = require('../../helpers/extractErrors');
const errorTypes = require('../errors/types/auth');
const User = require('../../models/user');

module.exports = {
  loggedUserData: async (_, {isAuth, userId}) => {
    try {
      if (!isAuth) {
        throw new Error(errorTypes.NOT_AUTHORIZED);
      }

      const userData = await User.findOne({ _id: userId });

      return { ...userData._doc, _id: userData.id };

    } catch(err) {
      throw err;
    }
  },
  createUser: async ({userInput}) => {
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
      const { username, password } = logInInput;

      const existingUser = await User.findOne({ username });

      if (!existingUser) {
        throw new Error(errorTypes.INVALID_CREDENTIALS);
      }
      
      const arePasswordsCorrect = await bcrypt.compare(password, existingUser.password);

      if (!arePasswordsCorrect) {
        throw new Error(errorTypes.INVALID_CREDENTIALS);
      }

      const token = jwt.sign(
        { userId: existingUser._id, username },
        process.env.JWT_KEY,
        {
          expiresIn: '1h'
        }
      );

      return { 
        _id: existingUser._id, 
        email: existingUser.email,
        username: existingUser.username,
        token,
        tokenExpiration: 1
      };
    }
    catch (err) {
      throw err;
    }
  }
};