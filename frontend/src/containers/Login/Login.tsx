import React from 'react';

import Modal from '../../components/common/Modal/Modal';

import './Login.scss';

type LogInProps = {
  close(): void
}

class LogIn extends React.Component<LogInProps, any> {
  render() {
    return (
      <Modal close={this.props.close}>
        <div>siema</div>
      </Modal>
    );
  }
}

export default LogIn;

// RouteComponentProps<any | LoginProps