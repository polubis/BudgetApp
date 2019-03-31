import React from 'react';
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

class Alert extends React.Component<AlertProps & AlertDefinition, any> {
  state = {
    alertAnimationClass: 'alert--appears'
  }

  currentTime = 0;
  removeAlertTimer: any;
  updateAlertTimer: any;
  
  interval$ = setInterval(() => {
    this.currentTime += 1000;
    if (this.currentTime >= this.props.closeTime) {
      this.handleRemovingAlert();
    }
  }, 1000); 

  componentDidUpdate(prevProps: AlertProps & AlertDefinition) {
    if (prevProps.numberOfRepetitions !== this.props.numberOfRepetitions) {
      this.setState({alertAnimationClass: 'alert--repeated'});
      this.updateAlertTimer = setTimeout(() => this.setState({alertAnimationClass: ''}), 300);
      this.currentTime = 0;
    }
  }

  handleRemovingAlert = (id = this.props.id) => {
    this.setState({alertAnimationClass: 'alert--removed'});
    this.removeAlertTimer = setTimeout(() => this.props.removeAlert(id), 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval$);
    clearTimeout(this.removeAlertTimer);
    clearTimeout(this.updateAlertTimer);
  }

  render() {
    const { id, type, message } = this.props;
    return (
    <li className={`click alert alert--${type} ${this.state.alertAnimationClass}`} onClick={() => this.handleRemovingAlert(id)}>
      <MaterialIcon icon={icons[type]} />
      <span className='alert__message'>{message}</span>
    </li>
    );
  }
}

export default Alert;

