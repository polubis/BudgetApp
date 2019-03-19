
import { combineReducers } from 'redux';
import authReducer from '../features/Auth/reducer';

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;