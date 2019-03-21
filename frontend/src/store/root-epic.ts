import { combineEpics } from 'redux-observable';

import * as AuthEpics from '../features/Auth/epics';
import * as AlertEpics from '../features/Alerts/epics';

export default combineEpics(...Object.values(
  {
    ...AlertEpics, 
    ...AuthEpics
  }
));