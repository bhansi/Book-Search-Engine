const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (_, { _id }) => {
      return User.findById(_id).populate('savedBooks');
    }
  },
  Mutation: {
    login: async (_, { criteria }) => {
      const user = await User.findOne({
        $or: [
          { username: criteria.username },
          { email: criteria.email }
        ]
      });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(criteria.password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  },
  addUser: async (_, { criteria }) => {
    const user = await User.create(criteria);
    const token = signToken(user);

    return { token, user };
  }
};

module.exports = resolvers;
