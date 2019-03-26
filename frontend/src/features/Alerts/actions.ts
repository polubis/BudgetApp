import { action } from 'typesafe-actions';

import { AlertDefinition } from './models';

import * as alertTypes from './constants';

const aT = alertTypes;

export const addAlert = (alert: AlertDefinition) => action(aT.ADD_ALERT, alert);

export const pushAlert = (alert: AlertDefinition) => action(aT.PUSH_ALERT, alert);

export const removeAlert = (alertId: string) => action(aT.REMOVE_ALERT, alertId);

export const clearAlerts = () => action(aT.CLEAR_ALERTS, null);