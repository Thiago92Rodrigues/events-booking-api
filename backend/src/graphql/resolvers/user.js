const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
  /**
   * This function creates a new user and save it in the database
   */
  createUser: async (args) => {
    console.log('CREATE USER');
    try {
      // verify if this user isn't already registered in the database
      const user = await User.findOne({ email: args.userInput.email });
      if (user) throw new Error('User exists already.');

      // encrypt the user's password
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      console.log(newUser);

      const result = await newUser.save();
      return {
        ...result._doc,
        _id: result.id,
        password: null
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * This function logs a user in the app
   */
  login: async ({ email, password }) => {
    console.log('LOGIN');
    try {
      // get the user data in the database
      const user = await User.findOne({ email: email });
      if (!user) throw new Error('User does not exists.');

      // verify if the informed password is valid
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('Credentials are invalid.');

      // creates a new token for the logged user
      const token = await jwt.sign(
        { userId: user.id, email: user.email },
        'secret-key',
        { expiresIn: '1h' }
      );

      return {
        userId: user.id,
        token: token,
        tokenExpiration: 1
      };
    } catch (error) {
      throw error;
    }
  }
};
