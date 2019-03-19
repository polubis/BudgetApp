const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createAccount: async ({userInput}) => {
    try {
      const { username, email, password } =  userInput;
      const existingUser = await User.findOne(
        { $or:[ { username }, { email } ] }
      );

      if (existingUser) {
        throw new Error('User exists already.');
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        username,
        email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
