import { ActionType } from 'typesafe-actions';
import { combineReducers } from 'redux';

import * as authActions from './actions';
import * as alertsActionsTypes from './constants';
import { AlertDefinition } from './models';

const aT = alertsActionsTypes;

export type AlertsState = {
  readonly alerts: AlertDefinition[];
}

export type AuthActions = ActionType<typeof authActions>;

const initialState: AlertsState = {
  alerts: []
};

const actionMap: any = {
  [aT.PUSH_ALERT]: (state: AlertsState, alert: AlertDefinition) => {
    const alerts = [...state.alerts];
    const alertIndex = state.alerts.findIndex(({id}) => id === alert.id);
    if (alertIndex === -1) alerts.push(alert);
    else {
      alerts[alertIndex] = {...alert, 
        numberOfRepetitions: ++alerts[alertIndex].numberOfRepetitions
      };
    }
    
    return { ...state, alerts };
  },
  [aT.REMOVE_ALERT]: (state: AlertsState, alertId: string) => 
  ({
    ...state, alerts: state.alerts.filter(({id}) => id !== alertId)
  }),
  [aT.CLEAR_ALERTS]: (state: AlertsState) => ({
    ...state, alerts: []
  })
};

export default combineReducers ({
  alertsReducer: (state = initialState, action: AuthActions) =>
    actionMap[action.type] ? actionMap[action.type](state, action.payload) : state
});