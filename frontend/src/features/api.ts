import axios, { AxiosPromise, AxiosResponse } from 'axios';
import store from '../store/index';
import * as alertsActions from './Alerts/actions';

import { AlertDefinition } from './Alerts/models';
import { GraphQlBody, GrapQlResponse, GrapQlError } from './models';

const API = 'http://localhost:3030/graphql';

const parseBody = <T>(body: GraphQlBody<T>): string => JSON.stringify(body);

const executeRequest = <T>(body: GraphQlBody<T>): Promise<T> => new Promise((resolve, reject) => {
  prepareRequest(body).then((res: AxiosResponse<any>) => {
    const { data, errors }: GrapQlResponse = res.data;
    const errorsOccured = errors.length > 0;
    const requestId = Object.keys(data)[0];

    if (errorsOccured) {
      const error: GrapQlError = errors[0];
      const alert: AlertDefinition = { id: requestId, message: error.message, closeTime: 5000, type: 'error' }; 
      store.dispatch(alertsActions.addAlert(alert));
      reject(error); 
    }
    resolve(data);
  }).catch(err => {
    reject();
  });
});

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