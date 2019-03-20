import { CreateAccountPayload } from './models';
import { GraphQlBody } from '../models';

const createAccountQuery = (payload: CreateAccountPayload): GraphQlBody<CreateAccountPayload> => 
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
    variables: {...payload}
  });

export {
  createAccountQuery
}