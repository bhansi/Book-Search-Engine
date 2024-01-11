const { User } = require('../models');

const resolvers = {
  Query: {
    getSingleUser: async (_, { _id }) => {
      return User.findById(_id).populate('savedBooks');
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      return;
    }
  }
};

module.exports = resolvers;
