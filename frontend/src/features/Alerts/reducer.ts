import { ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import * as authActions from './actions';
import { ADD_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from './constants';
import { AlertDefinition } from './models';

export type AlertsState = {
  readonly alerts: AlertDefinition[];
}

export type AuthActions = ActionType<typeof authActions>;

const initialState: AlertsState = {
  alerts: []
};

const actionMap: any = {
  [ADD_ALERT]: (state: AlertsState, alert: AlertDefinition) => 
  ({
    ...state,
    alerts: 
      state.alerts.findIndex(({id}) => id === alert.id) > -1 ? 
      state.alerts.map(a => a.id === alert.id ? {...alert} : a) : 
      [...state.alerts, alert]
  }),
  [REMOVE_ALERT]: (state: AlertsState, alertId: string) => 
  ({
    ...state,
    alerts: state.alerts.filter(({id}) => id !== alertId)
  }),
  [CLEAR_ALERTS]: (state: AlertsState) => ({
    ...state,
    alerts: []
  })
};

export default combineReducers ({
  alertsReducer: (state = initialState, action: AuthActions) =>
    actionMap[action.type] ? actionMap[action.type](state, action.payload) : state
});