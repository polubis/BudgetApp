import { isOfType } from 'typesafe-actions';
import { Epic, ofType } from 'redux-observable';
import { filter, mergeMap, debounceTime, map, catchError, takeUntil } from 'rxjs/operators';
import { from, of } from 'rxjs';

import { RootAction } from 'StoreTypes';
import * as authActionsTypes from './constants';
import * as authActions from './actions';
import * as authGrapQL from './graph-ql';
import { User } from 'Entities';
import { setCookie, removeCookie } from '../../services/cookies-service';

import executeRequest from '../api';

const aAt = authActionsTypes;
const aA = authActions;
const aGQ = authGrapQL;

export const createAccountEpic: Epic<RootAction, RootAction> = (action$) =>
  action$.pipe(
    filter(isOfType(aAt.CREATE_ACCOUNT)),
    debounceTime(250),
    mergeMap(action => 
      from(executeRequest(aGQ.createAccountMutation(action.payload))).pipe(
        map(res => aA.createAccountSuccess()),
        catchError((err) => of(aA.createAccountFailure()))
      )
    ),
    takeUntil(action$.pipe(ofType(aAt.CREATE_ACCOUNT_CANCELLED)))
  );

export const logInEpic: Epic<RootAction, RootAction> = (action$) => 
  action$.pipe(
    filter(isOfType(aAt.LOG_IN)),
    debounceTime(250),
    mergeMap(action =>
      from(executeRequest(aGQ.logInQuery(action.payload))).pipe(
        map(res => {
          const { token, ...rest } = res;
          const user = {...rest} as User;
          setCookie('token', token, 1);
          return aA.logInSuccess({user, token});
        }),
        catchError(() => of(aA.logInFailure())),
      )
    ),
    takeUntil(action$.pipe(ofType(aAt.LOG_IN_CANCELLED)))
  );

export const getAuthData: Epic<RootAction, RootAction> = (action$) => 
  action$.pipe(
    filter(isOfType(aAt.GET_AUTH_DATA)),
    debounceTime(250),
    mergeMap(action => {
      const token = action.payload;
      return from(executeRequest(aGQ.loggedUserDataQuery(), token)).pipe(
        map(user => aA.getAuthDataSuccess({ user, token })),
        catchError(() => {
          removeCookie();
          return of(aA.getAuthDataFailure());
        })
      )
    })
  );