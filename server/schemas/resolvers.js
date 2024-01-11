const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      else {
        throw AuthenticationError;
      }
    }
  },
  Mutation: {
    login: async (_, { userData }) => {
      const { email, password } = userData;

      const user = await User.findOne({ email: email });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (_, { userData }) => {
      const user = await User.create(userData);
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (_, { bookData }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );
      }
      else {
        throw AuthenticationError;
      }
    },
    removeBook: async (_, bookId, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId } },
          { new: true }
        );
      }
      else {
        throw AuthenticationError;
      }
    }
  }
};

module.exports = resolvers;
