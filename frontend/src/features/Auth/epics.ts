import { isOfType } from 'typesafe-actions';
import { tap, filter } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { RootAction, RootState } from 'StoreTypes';
import { CREATE_ACCOUNT } from './constants';


export const createAccountAction: Epic<RootAction, RootAction, RootState> = 
  (action$, state$) =>
    action$.pipe(
      filter(isOfType(CREATE_ACCOUNT)),
      tap(action => {
        console.log(action);
        console.log("Siema");
      })
    )