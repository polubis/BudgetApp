import { CreateAccountPayload, LogInPayload } from './models';
import { GraphQlBody } from '../../api/models';

const createAccountMutation = (payload: CreateAccountPayload): GraphQlBody<CreateAccountPayload> => 
  ({
    query: `
      mutation CreateAccount($email: String!, $username: String!, $password: String!) {
        createAccount(userInput: {email: $email, username: $username, password: $password}) {
          _id
          username
          email
        }
      }
    `,
    variables: {username: payload.username, email: payload.email, password: payload.password}
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
  createAccountMutation,
  logInQuery,
  loggedUserDataQuery
}