import { action } from 'typesafe-actions';

import { CREATE_ACCOUNT } from '../../constants';

export const createAccount = () => action(CREATE_ACCOUNT);