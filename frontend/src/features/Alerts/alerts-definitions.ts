import { AlertsMetaData, AlertDefinition } from './models'; 

export const alertsDefinitions: {[key: string]: AlertsMetaData} = {
  createAccount: new AlertsMetaData(new AlertDefinition('createAccount', 'Accout has been succesfully created', 'ok'))
}
