import { isOfType } from 'typesafe-actions';
import { Epic, ofType } from 'redux-observable';
import { filter, mergeMap, debounceTime, map, catchError, takeUntil, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { RootAction } from 'StoreTypes';
import * as authActionsTypes from './constants';
import * as authActions from './actions';
import * as authGrapQL from './graph-ql';
import { User } from 'Entities';
import { setCookie, removeCookie } from '../../services/cookies-service';

import { callApi } from '../../api/api' 

const aAt = authActionsTypes;
const aA = authActions;
const aGQ = authGrapQL;

export const createUserEpic: Epic<RootAction, RootAction> = (action$) =>
  action$.pipe(
    filter(isOfType(aAt.CREATE_ACCOUNT)),
    debounceTime(250),
    flatMap(action => 
      callApi(aGQ.createUserMutation(action.payload)).pipe(
        map(res => aA.createAccountSuccess()),
        catchError((err) => of(aA.createAccountFailure())),
        takeUntil(action$.pipe(ofType(aAt.AUTH_CANCELLED)))
      )
    )
  );

export const logInEpic: Epic<RootAction, RootAction> = (action$) => 
  action$.pipe(
    filter(isOfType(aAt.LOG_IN)),
    debounceTime(250),
    flatMap(action =>
      callApi(aGQ.logInQuery(action.payload)).pipe(
        map((res: any) => {
          const { token, ...rest } = res;
          const user = {...rest} as User;
          setCookie('token', token, 1);
          return aA.logInSuccess({user, token});
        }),
        catchError(() => {
          return of(aA.logInFailure())
        }),
        takeUntil(action$.pipe(ofType(aAt.AUTH_CANCELLED)))
      ),
    )
  );

export const getAuthData: Epic<RootAction, RootAction> = (action$) => 
  action$.pipe(
    filter(isOfType(aAt.GET_AUTH_DATA)),
    debounceTime(250),
    mergeMap(action => {
      const token = action.payload;
      return callApi(aGQ.loggedUserDataQuery(), token).pipe(
        map((user: any) => aA.getAuthDataSuccess({ user, token })),
        catchError(() => {
          removeCookie();
          return of(aA.getAuthDataFailure());
        })
      )
    })
  );