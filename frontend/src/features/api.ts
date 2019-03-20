import axios, { AxiosPromise } from 'axios';

import { GraphQlBody } from './models';

const API = 'http://localhost:3030/graphql';

const parseBody = (body: GraphQlBody<any>): string => JSON.stringify(body);

const executeRequest = <T>(body: GraphQlBody<T>): Promise<any> => {
  console.log(body);
  const parsedBody = parseBody(body);

  const request: AxiosPromise<any> = axios.post(API, parsedBody, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return request;
}

export default executeRequest;