import axios, { AxiosPromise, AxiosResponse } from 'axios';
import store from '../store/index';
import { alertsDefinitions } from '../features/Alerts/alerts-definitions';

import { addAlert } from '../features/Alerts/actions';
import { AlertDefinition, AlertsMetaData } from '../features/Alerts/models';
import { GraphQlBody, GrapQlResponse } from './models';

const errorsBlackObject: {[key: string]: string} = {
  loggedUserData: 'loggedUserData'
}

const API = 'http://localhost:3030/graphql';

const parseBody = <T>(body: GraphQlBody<T>): string => JSON.stringify(body);

const executeRequest = <T>(body: GraphQlBody<T>, token?: string): Promise<any> => new Promise((resolve, reject) => {
  prepareRequest(body, token).then((res: AxiosResponse<any>) => {
    manageAlertsMetaData(res.data, 
      (requestId: string, message: string) => {
        if (!errorsBlackObject[requestId]) {
          handleAddNewAlert(new AlertDefinition(requestId, message, 'error'));
        }
        reject(message);
      },
      (data: any, alert?: AlertDefinition) => {
        if (alert) {
          handleAddNewAlert(alert);
        }
        resolve(data);
      }
    );

  }).catch(() => {
    const errorAlert = alertsDefinitions['unknownError'].alert!;
    handleAddNewAlert(errorAlert);
    reject();
  });
});

const manageAlertsMetaData = ({data, errors}: GrapQlResponse, onErrorsOccured: any, onSuccessOccured: any) => {
  const requestId = Object.keys(data)[0];
  const alertMetaData: AlertsMetaData | undefined = alertsDefinitions[requestId];
  if (errors !== undefined) {
    if (!alertMetaData || alertMetaData.showMessageOnError) {
      onErrorsOccured(requestId, errors[0].message);
    }
  }
  else {
    onSuccessOccured(data[requestId], alertMetaData && alertMetaData.alert);
  }
}

const handleAddNewAlert = (alert: AlertDefinition): void => {
  store.dispatch(addAlert(alert));
}

const prepareRequest = <T>(body: GraphQlBody<T>, token?: string): AxiosPromise<T> => {
  const headers: {[key: string]: string} = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  return axios.post(API, parseBody(body), { headers });
}
  

export default executeRequest;