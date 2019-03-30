import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import store from '../store/index';
import alertsDefinitions, { errorsBlackObject } from '../features/Alerts/alerts-definitions';
import { addAlert } from '../features/Alerts/actions';
import { AlertDefinition } from '../features/Alerts/models';
import { GraphQlBody, GrapQlResponse } from './models';

const API = 'http://localhost:3030/graphql';

const parseBody = <T>(body: GraphQlBody<T>): string => JSON.stringify(body);

const prepareRequest = <T>(body: GraphQlBody<T>, token?: string): AxiosPromise<T> => {
  const headers: {[key: string]: string} = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  return axios.post(API, parseBody(body), { headers });
}

const handleAddNewAlert = (alert: AlertDefinition): void => {
  store.dispatch(addAlert(alert));
}
  
export const callApi = <T>(body: GraphQlBody<T>, token?: string): Observable<AxiosResponse<any>> => {
  const call = from(prepareRequest(body, token));  
  let requestId: any;
  return call.pipe(
    map((res: any) => {
      const { data, errors }: GrapQlResponse = res.data;
      requestId = Object.keys(data)[0];
      return { data, errors }
    }),
    map(({data, errors}: GrapQlResponse) => {
      if (errors !== undefined) {
        throw errors[0];
      }

      if (alertsDefinitions.hasOwnProperty(requestId)) {
        handleAddNewAlert(alertsDefinitions[requestId]);
      }

      return data[requestId];
    }),
    catchError((err: any) => {
      if (errorsBlackObject.hasOwnProperty(requestId)) {
        throw 'error';
      }

      let alert = alertsDefinitions.unknownError;

      if (err.message) {
        alert = new AlertDefinition(requestId, err.message, 'error', 5000);
      }
        
      handleAddNewAlert(alert);

      throw 'error';
    })
  );
}