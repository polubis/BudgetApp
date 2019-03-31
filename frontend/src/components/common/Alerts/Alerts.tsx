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
  alerts: AlertDefinition[];
  removeAlert: (alertId: string) => any;
}

const Alerts = ({alerts, removeAlert}: AlertsProps) => (
  <div className='alerts'>
    <ul>
      {alerts.map(alert => (
        <Alert 
          {...alert}
          key={alert.id + alert.message} 
          removeAlert={removeAlert}
        />
      ))}
    </ul>
  </div>
);

const mapStateToProps = ({alerts}: StoreTypes.RootState) => ({
  alerts: getAlerts(alerts.alertsReducer)
});

const mapDispatchToProps = (dispatch: Dispatch<StoreTypes.RootAction>) => 
  bindActionCreators(
    {
      removeAlert
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);


