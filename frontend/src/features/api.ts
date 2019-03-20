import axios, { AxiosPromise, AxiosResponse } from 'axios';

import { GraphQlBody, GrapQlResponse, GrapQlError } from './models';

const API = 'http://localhost:3030/graphql';

const parseBody = <T>(body: GraphQlBody<T>): string => JSON.stringify(body);

const executeRequest = <T>(body: GraphQlBody<T>): Promise<T> => new Promise((resolve, reject) => {
  prepareRequest(body).then((res: AxiosResponse<any>) => {
    const { data, errors }: GrapQlResponse = res.data;
    const errorsOccured = errors.length > 0;
    const requestId = Object.keys(data)[0];

    if (errorsOccured) {
      console.log(requestId);
      reject(errors[0] as GrapQlError); 
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