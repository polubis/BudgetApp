import { isOfType } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RootAction } from 'StoreTypes';
import { TRY_ADD_ALERT } from './constants';
import { removeAlert, addAlert } from './actions';

export const tryAddAlertEpic: Epic<RootAction, RootAction> = (action$) =>
  action$.pipe(
    filter(isOfType(TRY_ADD_ALERT)),
    mergeMap(({payload}) => {
      return of(
        removeAlert(payload.id),
        addAlert(payload)
      )
    })
  );