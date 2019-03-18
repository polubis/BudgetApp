import React from 'react';

import Modal from '../../components/common/Modal/Modal';
import AuthHeader from '../../components/auth/AuthHeader/AuthHeader';
import Commercial from '../../components/auth/Commercial/Commercial';
import Login from './Login/Login';
import Register from './Register/Register';

import LaptoptImg from './assets/laptop.jpg';
import LaptopStatsImg from './assets/laptop-stats.jpg';

import './Auth.scss';

type AuthProps = {
  close(): void;
  whichForm: string;
}

type State = {
  currentForm: string;
}

class Auth extends React.Component<AuthProps, State> {
  readonly state: State = { currentForm: this.props.whichForm };

  changeCurrentForm = (formName: string): void => this.setState({currentForm: formName});

  render() {
    const { currentForm } = this.state;
    return (
      <Modal id='auth' close={this.props.close}>

        <div id='auth__login-wrap'>
          {currentForm === 'register' ? 
            <Commercial 
              commercialKey='login'
              imagePath={LaptopStatsImg}
            />  : 
            <>
              <AuthHeader 
                action={() => this.changeCurrentForm('register')}
                message='type your credentials'
                logInClass='second-color'
              />
              <Login />
            </>
          }
        </div>

        <div id='auth__register-wrap' className='col'>  
          {currentForm === 'login' ? 
            <Commercial 
              commercialKey='register'
              imagePath={LaptoptImg}
            /> :
            <>
              <AuthHeader 
                action={() => this.changeCurrentForm('login')}
                message='populate account informations'
                registerClass='second-color'
              />
              <Register />
            </>
          }
        </div>

      </Modal>
    );
  }
}

export default Auth;