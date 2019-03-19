const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type RootQuery {
    users: [User!]!
  }

  type RootMutation {
    createAccount(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
