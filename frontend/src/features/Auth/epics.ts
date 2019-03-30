import { Epic, ofType } from 'redux-observable';
import { map, catchError, takeUntil, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { RootAction } from 'StoreTypes';
import * as authActionsTypes from './constants';
import * as authActions from './actions';
import * as authGrapQL from './graph-ql';
import { User } from 'Entities';
import { setCookie, removeCookie } from '../../services/cookies-service';
import { hoObservable } from '../utils';

import { callApi } from '../../api/api' 

const aAt = authActionsTypes;
const aA = authActions;
const aGQ = authGrapQL;

export const createUserEpic: Epic<RootAction, RootAction> = (action$) =>
  hoObservable(action$, aAt.CREATE_USER).pipe(
    switchMap(action => 
      callApi(aGQ.createUserMutation(action.payload)).pipe(
        map(res => aA.createUserSuccess()),
        catchError((err) => of(aA.createUserFailure())),
        takeUntil(action$.pipe(ofType(aAt.AUTH_CANCELLED)))
      )
    )
  );

export const logInEpic: Epic<RootAction, RootAction> = (action$) => 
  hoObservable(action$, aAt.LOG_IN).pipe(
    switchMap(action => 
      callApi(aGQ.logInQuery(action.payload)).pipe(
        map((res: any) => {
          const { token, ...rest } = res;
          const user = {...rest} as User;
          setCookie('token', token, 1);
          return aA.logInSuccess({user, token});
        }),
        catchError(() => of(aA.logInFailure()))
      )
    )
  );

export const getAuthData: Epic<RootAction, RootAction> = (action$) => 
  hoObservable(action$, aAt.GET_AUTH_DATA).pipe(
    switchMap(action => {
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