import { action } from 'typesafe-actions';

import * as aTypes from './constants'; 

import { CreateAccountPayload, LogInPayload } from './models';
import { User } from 'Entities';

export const createAccount = (payload: CreateAccountPayload) => action(aTypes.CREATE_ACCOUNT, payload);

export const createAccountSuccess = () => action(aTypes.CREATE_ACCOUNT_SUCCESS);

export const createAccountFailure = () => action(aTypes.CREATE_ACCOUNT_FAILURE);

export const logIn = (payload: LogInPayload) => action(aTypes.LOG_IN, payload);

export const logInSuccess = (payload: {user: User, token: string}) => action(aTypes.LOG_IN_SUCCESS, payload);

export const logInFailure = () => action(aTypes.LOG_IN_FAILURE);

export const authCancelled = () => action(aTypes.AUTH_CANCELLED);

export const getAuthData = (token: string) => action(aTypes.GET_AUTH_DATA, token);

export const getAuthDataSuccess = (authData: {user: User, token: string}) => action(aTypes.GET_AUTH_DATA_SUCCESS, authData);

export const getAuthDataFailure = () => action(aTypes.GET_AUTH_DATA_FAILURE);



