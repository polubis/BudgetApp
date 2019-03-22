import { isOfType } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { filter, mergeMap, debounceTime, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { RootAction } from 'StoreTypes';
import { CREATE_ACCOUNT, TRY_LOG_IN } from './constants';
import { createAccountSuccess, createAccountFailure, logInFailure, logInSuccess } from './actions';
import { User } from 'Entities';
import { createAccountMutation, logInMutation } from './graph-ql';

import executeRequest from '../api';

export const createAccountEpic: Epic<RootAction, RootAction> = (action$) =>
  action$.pipe(
    filter(isOfType(CREATE_ACCOUNT)),
    debounceTime(250),
    mergeMap(action => {
      return from(executeRequest(createAccountMutation(action.payload))).pipe(
        map(res => {
          return createAccountSuccess();
        }),
        catchError((err) => {
          return of(createAccountFailure());
        })
      )
    })
  );

export const logInEpic: Epic<RootAction, RootAction> = (action$) => 
    action$.pipe(
      filter(isOfType(TRY_LOG_IN)),
      debounceTime(250),
      mergeMap(action => {
        return from(executeRequest(logInMutation(action.payload))).pipe(
          map(user => {
            return logInSuccess(user as User);
          }),
          catchError(() => {
            return of(logInFailure());
          }),
        )
      })
    )