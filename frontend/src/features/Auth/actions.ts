import { action } from 'typesafe-actions';

import * as aTypes from './constants'; 

import { CreateUserPayload, LogInPayload } from './models';
import { User } from 'Entities';

export const createUser = (payload: CreateUserPayload) => action(aTypes.CREATE_USER, payload);

export const createUserSuccess = () => action(aTypes.CREATE_USER_SUCCESS);

export const createUserFailure = () => action(aTypes.CREATE_USER_FAILURE);

export const logIn = (payload: LogInPayload) => action(aTypes.LOG_IN, payload);

export const logInSuccess = (payload: {user: User, token: string}) => action(aTypes.LOG_IN_SUCCESS, payload);

export const logInFailure = () => action(aTypes.LOG_IN_FAILURE);

export const authCancelled = () => action(aTypes.AUTH_CANCELLED);

export const getAuthData = (token: string) => action(aTypes.GET_AUTH_DATA, token);

export const getAuthDataSuccess = (authData: {user: User, token: string}) => action(aTypes.GET_AUTH_DATA_SUCCESS, authData);

export const getAuthDataFailure = () => action(aTypes.GET_AUTH_DATA_FAILURE);



