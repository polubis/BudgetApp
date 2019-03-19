import { ActionsObservable } from 'redux-observable';

export const logInEpic = (action$: ActionsObservable<any>, state$: any) => {
  return action$;
}