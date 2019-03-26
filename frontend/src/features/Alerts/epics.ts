import { isOfType } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { RootAction } from 'StoreTypes';
import { ADD_ALERT } from './constants';
import { removeAlert, pushAlert } from './actions';

export const addAlertEpic: Epic<RootAction, RootAction> = (action$) =>
  action$.pipe(
    filter(isOfType(ADD_ALERT)),
    mergeMap(({payload}) => 
      of(
        removeAlert(payload.id),
        pushAlert(payload)
      )
    )
  );