import { AlertDefinition } from './models'; 

const unknownError = new AlertDefinition('unknownError', 'There is a other problem that usually. Try again later', 'error', 5000);
const createAccount = new AlertDefinition('createAccount', 'Accout has been succesfully created', 'ok');
const logIn = new AlertDefinition('logIn', 'You have successfully logged in', 'ok');

export default { 
  unknownError,
  createAccount,
  logIn
} as {[key: string] : AlertDefinition};

export const errorsBlackObject: {[key: string]: string} = {
  loggedUserData: 'loggedUserData'
}