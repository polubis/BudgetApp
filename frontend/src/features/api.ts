import axios, { AxiosPromise, AxiosResponse } from 'axios';
import store from '../store/index';
import { alertsDefinitions } from './Alerts/alerts-definitions';

import { tryAddAlert } from './Alerts/actions';
import { AlertDefinition, AlertsMetaData } from './Alerts/models';
import { GraphQlBody, GrapQlResponse, GrapQlError } from './models';

const API = 'http://localhost:3030/graphql';

const parseBody = <T>(body: GraphQlBody<T>): string => JSON.stringify(body);

const executeRequest = <T>(body: GraphQlBody<T>): Promise<T> => new Promise((resolve, reject) => {
  prepareRequest(body).then((res: AxiosResponse<any>) => {

    manageAlertsMetaData(res.data, 
      (requestId: string, message: string) => {
        handleAddNewAlert(new AlertDefinition(requestId, message, 'error'));
        reject(message);
      },
      (alert: AlertDefinition, data: any) => {
        if (alert) {
          handleAddNewAlert(alert);
        }
        resolve(data);
      }
    );

  }).catch(err => {
    reject();
  });
});

const manageAlertsMetaData = ({data, errors}: GrapQlResponse, onErrorsOccured: any, onSuccessOccured: any) => {
  const errorsOccured: GrapQlError[] | undefined = errors; 
  const requestId = Object.keys(data)[0];
  const alertMetaData: AlertsMetaData | undefined = alertsDefinitions[requestId];
  if (errorsOccured) {
    if (!alertMetaData || alertMetaData.showMessageOnError) {
      onErrorsOccured(requestId, errors[0].message);
    }
  }
  else {
    onSuccessOccured(alertMetaData.alert, data);
  }
}

const handleAddNewAlert = (alert: AlertDefinition): void => {
  store.dispatch(tryAddAlert(alert));
}

const prepareRequest = <T>(body: GraphQlBody<T>): AxiosPromise<T> => {
  const parsedBody = parseBody(body);

  return axios.post(API, parsedBody, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

export default executeRequest;