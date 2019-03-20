import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { AlertDefinition } from './types';
import Alert from './Alert/Alert';
import StoreTypes from 'StoreTypes';

import './Alerts.scss';

type AlertsProps = {
  classes: string;
  alerts: AlertDefinition[];
}

const Alerts = ({alerts, classes}: AlertsProps) => (
  <div className={`alerts ${classes}`}>
    <ul>
      {alerts.map(alert => (
        <Alert 
          key={alert.id} 
          {...alert}
        />
      ))}
    </ul>
  </div>
);

const mapStateToProps = (state: StoreTypes.RootState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<StoreTypes.RootAction>) => 
  bindActionCreators(
    {
      
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);


