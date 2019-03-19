import { ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import * as authActions from './actions';
import { CREATE_ACCOUNT, CREATE_ACCOUNT_SUCCESS } from '../../constants';

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
  }),
  [CREATE_ACCOUNT_SUCCESS]: (state: AuthState) => 
  ({
    ...state,
    isCreatingAccount: false
  })
};

export default combineReducers ({
  authReducer: (state = initialState, action: AuthActions) =>
    actionMap[action.type] ? actionMap[action.type](state, action) : state
});