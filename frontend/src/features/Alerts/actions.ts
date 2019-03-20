import { action } from 'typesafe-actions';

import { AlertDefinition } from './models';

import { ADD_ALERT, REMOVE_ALERT } from './constants';

export const addAlert = (alert: AlertDefinition) => action(ADD_ALERT, alert);

export const removeAlert = (alertId: string) => action(REMOVE_ALERT, alertId);
