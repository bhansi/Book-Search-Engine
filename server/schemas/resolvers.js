const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (_, { _id }) => {
      return User.findById(_id).populate('savedBooks');
    }
  },
  Mutation: {
    createUser: async (_, { criteria }) => {
      const user = await User.create(criteria);
      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;
