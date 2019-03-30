import { CreateAccountPayload, LogInPayload } from './models';
import { GraphQlBody } from '../../api/models';

const createUserMutation = (payload: CreateAccountPayload): GraphQlBody<CreateAccountPayload> => 
  ({
    query: `
      mutation CreateUser($email: String!, $username: String!, $password: String!) {
        createUser(userInput: {email: $email, username: $username, password: $password}) {
          _id
          username
          email
        }
      }
    `,
    variables: {...payload}
  });

const logInQuery = (payload: LogInPayload): GraphQlBody<LogInPayload> => 
  ({
    query: `
      query LogIn($username: String!, $password: String!) {
        logIn(logInInput: {username: $username, password: $password}) {
          _id
          username
          email
          token
        }
      }
    `,
    variables: {...payload}
  });

const loggedUserDataQuery = (): GraphQlBody<undefined> => 
  ({
    query: `
      query {
        loggedUserData {
          _id
          username
          email
        }
      }
    `
  });

export {
  createUserMutation,
  logInQuery,
  loggedUserDataQuery
}