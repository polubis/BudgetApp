import { isOfType } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { filter, mergeMap, debounceTime, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { RootAction } from 'StoreTypes';
import { CREATE_ACCOUNT } from './constants';
import { createAccountSuccess, createAccountFailure } from './actions';
import { createAccountQuery } from './graph-ql';

import executeRequest from '../api';

export const createAccountEpic: Epic<RootAction, RootAction> = (action$) =>
  action$.pipe(
    filter(isOfType(CREATE_ACCOUNT)),
    debounceTime(250),
    mergeMap(action => {
      return from(executeRequest(createAccountQuery(action.payload))).pipe(
        map(res => {
          return createAccountSuccess();
        }),
        catchError((err) => {
          return of(createAccountFailure());
        })
      )
    })
  );