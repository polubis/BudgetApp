import { action } from 'typesafe-actions';

import * as aTypes from './constants'; 

import { CreateAccountPayload, LogInPayload } from './models';
import { User } from 'Entities';

export const createAccount = (payload: CreateAccountPayload) => action(aTypes.CREATE_ACCOUNT, payload);

export const createAccountSuccess = () => action(aTypes.CREATE_ACCOUNT_SUCCESS);

export const createAccountFailure = () => action(aTypes.CREATE_ACCOUNT_FAILURE);

export const tryLogIn = (payload: LogInPayload) => action(aTypes.TRY_LOG_IN, payload);

export const logInSuccess = (payload: User) => action(aTypes.LOG_IN_SUCCESS, payload);

export const logInFailure = () => action(aTypes.LOG_IN_FAILURE);