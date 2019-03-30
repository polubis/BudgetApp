import { Observable } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

export const hoObservable = (action$: Observable<any>, type: string): Observable<any> =>
  action$.pipe(
    filter(isOfType(type)),
    debounceTime(250),
  );