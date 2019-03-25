import { ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import * as authActions from './actions';
import * as aTypes from './constants';
import { User } from 'Entities';

export type AuthState = {
  readonly isCreatingAccount: boolean;

  readonly isInAuthProcess: boolean;
  readonly loggedUser: User | null;
  readonly token: string;

  readonly isGettingAuthData: boolean;
}

export type AuthActions = ActionType<typeof authActions>;

const initialState: AuthState = {
  isCreatingAccount: false,

  isInAuthProcess: false,
  loggedUser: null,
  token: '',

  isGettingAuthData: true
};

const actionMap: any = {
  [aTypes.CREATE_ACCOUNT]: (state: AuthState) => ({
    ...state, isCreatingAccount: true
  }),
  [aTypes.CREATE_ACCOUNT_SUCCESS]: (state: AuthState) => ({
    ...state, isCreatingAccount: false
  }),
  [aTypes.CREATE_ACCOUNT_FAILURE]: (state: AuthState) => ({
    ...state, isCreatingAccount: false
  }),
  [aTypes.CREATE_ACCOUNT_CANCELLED]: (state: AuthState) => ({
    ...state, isCreatingAccount: false
  }),
  
  [aTypes.TRY_LOG_IN]: (state: AuthState) => ({
    ...state, isInAuthProcess: true
  }),
  [aTypes.LOG_IN_SUCCESS]: (state: AuthState, { payload }: any) => ({
    ...state, loggedUser: payload.user, isInAuthProcess: false, token: payload.token
  }),
  [aTypes.LOG_IN_FAILURE]: (state: AuthState) => ({
    ...state, isInAuthProcess: false
  }),
  [aTypes.CANCEL_LOG_IN]: (state: AuthState) => ({
    ...state, isInAuthProcess: false
  }),
  
  [aTypes.GET_AUTH_DATA_SUCCESS]: (state: AuthState, { payload }: any) => ({
    ...state, isGettingAuthData: false, loggedUser: payload.user, token: payload.token
  }),
  [aTypes.GET_AUTH_DATA_FAILURE]: (state: AuthState) => ({
    ...state, isGettingAuthData: false, loggedUser: null, token: ''
  })
};

export default combineReducers ({
  authReducer: (state = initialState, action: AuthActions) =>
    actionMap[action.type] ? actionMap[action.type](state, action) : state
});