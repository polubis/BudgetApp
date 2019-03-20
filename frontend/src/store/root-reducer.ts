
import { combineReducers } from 'redux';

import alertsReducer from '../features/Alerts/reducer';
import authReducer from '../features/Auth/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertsReducer
});

export default rootReducer;