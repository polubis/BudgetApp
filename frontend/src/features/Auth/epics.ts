import { isOfType } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { filter, switchMap, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';
import { RootAction } from 'StoreTypes';

import { CREATE_ACCOUNT } from './constants';
import { createAccountSuccess } from './actions';

export const createAccountAction: Epic<RootAction, RootAction> = (action$) =>
  action$.pipe(
    filter(isOfType(CREATE_ACCOUNT)),
    debounceTime(250),
    switchMap(() => 
      of(createAccountSuccess())
    ),
  );