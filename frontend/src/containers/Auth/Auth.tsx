import React from 'react';

import Modal from '../../components/common/Modal/Modal';
import Login from './Login/Login';
import AuthHeader from '../../components/auth/AuthHeader/AuthHeader';

import './Auth.scss';

type AuthProps = {
  close(): void
}

type AuthState = {
  currentForm: string;
}

const initialState: AuthState = { currentForm: 'login' };

type State = Readonly<typeof initialState>;

class Auth extends React.Component<AuthProps, any> {
  readonly state: State = initialState;

  render() {
    return (
      <Modal id='auth' close={this.props.close}>

        <div id='auth__login-wrap'>
          <AuthHeader 
            message='type your credentials'
            logInClass='second-color'
          />

          <div className='arrow-rectangle' />

        </div>

        <div id='auth__register-wrap'>
          <AuthHeader 
            message='populate account informations'
            registerClass='second-color'
          />

          <div className='arrow-rectangle' />
        </div>

      </Modal>
    );
  }
}

export default Auth;