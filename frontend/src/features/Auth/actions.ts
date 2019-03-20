import { action } from 'typesafe-actions';

import { CREATE_ACCOUNT, CREATE_ACCOUNT_SUCCESS, CREATE_ACCOUNT_FAILURE } from './constants';
import { CreateAccountPayload } from './models';

export const createAccount = (payload: CreateAccountPayload) => action(CREATE_ACCOUNT, payload);

export const createAccountSuccess = () => action(CREATE_ACCOUNT_SUCCESS);

export const createAccountFailure = () => action(CREATE_ACCOUNT_FAILURE);