import React, { useEffect } from 'react';

import MaterialIcon from '@material/react-material-icon';

import { AlertDefinition } from '../../../../features/Alerts/models';

import './Alert.scss';

type AlertProps = {
  removeAlert: (alertId: string) => any;
}

const icons: {[key: string]: string} = {
  error: 'error' ,
  warn: 'warn',
  ok: 'check'
}

const Alert = ({id, message, closeTime, type, removeAlert}: AlertProps & AlertDefinition) => {
  useEffect(() => {
    let timer: any;

    if (!timer) {
      timer = setTimeout(() => removeAlert(id), closeTime);
    }
    else {
      clearTimeout(timer);
      timer = setTimeout(() => removeAlert(id), closeTime);
    }

    return () => {
      clearTimeout(timer);
    }
  });

  return (
    <li className={`click alert alert--${type}`} onClick={() => removeAlert(id)}>
      <MaterialIcon icon={icons[type]} />
      <span className='alert__message'>{message}</span>
    </li>
  );
};

export default Alert;