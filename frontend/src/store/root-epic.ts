import { combineEpics } from 'redux-observable';

import * as authEpics from '../features/Auth/epics';
import * as alertsEpics from '../features/Alerts/epics';

export default combineEpics(...Object.values(
  {
    ...alertsEpics, 
    ...authEpics
  }
));