import { ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import * as authActions from './actions';
import { CREATE_ACCOUNT } from '../../constants';

export type AuthState = {
  readonly isCreatingAccount: boolean;
}

export type AuthActions = ActionType<typeof authActions>;

const initialState: AuthState = {
  isCreatingAccount: false,
};

const actionMap: any = {
  [CREATE_ACCOUNT]: (state: AuthState) => 
  ({
    ...state,
    isCreatingAccount: true
  })
};

export default combineReducers<any, AuthActions>({
  authReducer: (state = initialState, action: AuthActions) =>
    actionMap[action.type] ? actionMap[action.type](state, action) : state
});