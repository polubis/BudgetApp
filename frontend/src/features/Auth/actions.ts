import { action } from 'typesafe-actions';

import { CREATE_ACCOUNT, CREATE_ACCOUNT_SUCCESS } from './constants';
import { CreateAccountPayload } from './models';

export const createAccount = (payload: CreateAccountPayload) => action(CREATE_ACCOUNT, payload);

export const createAccountSuccess = () => action(CREATE_ACCOUNT_SUCCESS);