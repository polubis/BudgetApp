import { AlertsMetaData, AlertDefinition } from './models'; 

export const alertsDefinitions: {[key: string]: AlertsMetaData} = {
  unknownError: new AlertsMetaData(new AlertDefinition('unknownError', 'There is a other problem that usually. Try again later', 'error', 5000)),
  createAccount: new AlertsMetaData(new AlertDefinition('createAccount', 'Accout has been succesfully created', 'ok')),
  logIn: new AlertsMetaData(new AlertDefinition('logIn', 'You have successfully logged in', 'ok'))
}