const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    username: String!
    token: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input LogInInput {
    username: String
    email: String
    password: String! 
  }

  type RootQuery {
    users: [User!]!
  }

  type RootMutation {
    createAccount(userInput: UserInput): User
    logIn(logInInput: LogInInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
