const typeDefs = `
  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  input userInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    getSingleUser(_id: ID!): User
  }

  type Mutation {
    createUser(criteria: userInput!): Auth
  }
`;

module.exports = typeDefs;
