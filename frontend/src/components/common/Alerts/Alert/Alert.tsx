import React from 'react';

import MaterialIcon from '@material/react-material-icon';

import { AlertDefinition } from '../types';

import './Alert.scss';

const Alert = ({id, message, closeTime, type}: AlertDefinition) => (
  <li className={`alert alert--${type}`}>
    <MaterialIcon 
      icon='error'
    />
    <span className='alert__message'>{message}</span>
  </li>
);

export default Alert;