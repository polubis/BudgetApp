import { isOfType } from 'typesafe-actions';
import { Epic, ofType } from 'redux-observable';
import { filter, mergeMap, debounceTime, map, catchError, takeUntil } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { RootAction } from 'StoreTypes';
import { CREATE_ACCOUNT, TRY_LOG_IN, CANCEL_LOG_IN, CANCEL_CREATE_ACCOUNT } from './constants';
import { createAccountSuccess, createAccountFailure, logInFailure, logInSuccess } from './actions';
import { User } from 'Entities';
import { createAccountMutation, logInMutation } from './graph-ql';
import { setCookie } from '../../services/cookies-service';

import executeRequest from '../api';

export const createAccountEpic: Epic<RootAction, RootAction> = (action$) =>
  action$.pipe(
    filter(isOfType(CREATE_ACCOUNT)),
    debounceTime(250),
    mergeMap(action => 
      from(executeRequest(createAccountMutation(action.payload))).pipe(
        map(res => createAccountSuccess()),
        catchError((err) => of(createAccountFailure()))
      )
    ),
    takeUntil(action$.pipe(ofType(CANCEL_CREATE_ACCOUNT)))
  );

export const logInEpic: Epic<RootAction, RootAction> = (action$) => 
  action$.pipe(
    filter(isOfType(TRY_LOG_IN)),
    debounceTime(250),
    mergeMap(action =>
      from(executeRequest(logInMutation(action.payload))).pipe(
        map(res => {
          const { token, ...rest } = res;
          const user = {...rest} as User;
          setCookie('token', token, 1);
          return logInSuccess({user, token});
        }),
        catchError(() => of(logInFailure())),
      )
    ),
    takeUntil(action$.pipe(ofType(CANCEL_LOG_IN)))
  );