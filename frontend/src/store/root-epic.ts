import { combineEpics } from 'redux-observable';

import * as authEpics from '../features/Auth/epics';

export default combineEpics(...Object.values(
  {
    ...authEpics
  }
));