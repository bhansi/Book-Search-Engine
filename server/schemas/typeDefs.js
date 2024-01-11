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

  input loginInput {
    email: String!
    password: String!
  }

  input userInput {
    username: String!
    email: String!
    password: String!
  }

  input bookInput {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(userData: loginInput!): Auth
    addUser(userData: userInput!): Auth
    saveBook(bookData: bookInput!): User
  }
`;

module.exports = typeDefs;
