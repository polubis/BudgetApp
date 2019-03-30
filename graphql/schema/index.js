const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
  _id: ID!
  email: String!
  username: String!
}

type LoggedUserData {
  _id: ID!
  email: String!
  username: String!
  token: String
  tokenExpiration: Int
}

input UserInput {
  username: String!
  email: String!
  password: String!
}

input LogInInput {
  username: String!
  password: String! 
}

type RootQuery {
  logIn(logInInput: LogInInput): LoggedUserData
  loggedUserData: LoggedUserData
}

type RootMutation {
  createUser(userInput: UserInput): User
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
