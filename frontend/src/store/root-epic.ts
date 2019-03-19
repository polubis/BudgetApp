import { combineEpics } from 'redux-observable';

import * as AuthEpics from '../features/Auth/epics';

export default combineEpics(...Object.values(AuthEpics));