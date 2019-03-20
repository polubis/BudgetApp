import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { AlertDefinition } from '../../../features/Alerts/models';
import { getAlerts } from '../../../features/Alerts/selectors';
import { removeAlert } from '../../../features/Alerts/actions';
import Alert from './Alert/Alert';
import StoreTypes from 'StoreTypes';

import './Alerts.scss';

type AlertsProps = {
  classes: string;
  alerts: AlertDefinition[];
  removeAlert: (alertId: string) => any;
}

const Alerts = ({alerts, classes, removeAlert}: AlertsProps) => (
  <div className={`alerts ${classes}`}>
    <ul>
      {alerts.map(alert => (
        <Alert 
          key={alert.id} 
          removeAlert={removeAlert}
          {...alert}
        />
      ))}
    </ul>
  </div>
);

const mapStateToProps = (state: StoreTypes.RootState) => ({
  alerts: getAlerts(state.alerts.alertsReducer)
});

const mapDispatchToProps = (dispatch: Dispatch<StoreTypes.RootAction>) => 
  bindActionCreators(
    {
      removeAlert
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);


