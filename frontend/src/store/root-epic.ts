import { combineEpics } from 'redux-observable';

import * as AuthEpics from '../epics/Auth';

export default combineEpics(...Object.values(AuthEpics));