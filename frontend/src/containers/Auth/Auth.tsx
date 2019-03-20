import React from 'react';

import Modal from '../../components/common/Modal/Modal';
import AuthHeader from '../../components/auth/AuthHeader/AuthHeader';
import Commercial from '../../components/auth/Commercial/Commercial';
import Spinner from '../../components/ui/Spinner/Spinner';
import Alerts from '../../components/common/Alerts/Alerts';

import LaptoptImg from './assets/laptop.jpg';
import LaptopStatsImg from './assets/laptop-stats.jpg';

import Loadable from 'react-loadable';

import './Auth.scss';

const Login = Loadable({
  loader: () => import('./Login/Login'),
  loading: Spinner,
  delay: 2000
});

const Register = Loadable({
  loader: () => import('./Register/Register'),
  loading: Spinner,
  delay: 2000
});

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
        
        <Alerts 
          classes={`alerts--absolute ${currentForm === 'login' ? 'alerts--login' : 'alerts--register'}`}
        />

        <div id='auth__login-wrap'>
          {currentForm === 'login' ? 
            <>
              <AuthHeader 
                action={() => this.changeCurrentForm('register')}
                message='type your credentials'
                logInClass='second-color'
              />
              <Login />
            </> :
            <Commercial 
              commercialKey='login'
              imagePath={LaptopStatsImg}
            />
          }
        </div>

        <div id='auth__register-wrap' className='col'>  
          {currentForm === 'register' ? 
            <>
              <AuthHeader 
                action={() => this.changeCurrentForm('login')}
                message='populate account informations'
                registerClass='second-color'
              />
              <Register />
            </> :
            <Commercial 
              commercialKey='register'
              imagePath={LaptoptImg}
            />
          }
        </div>

      </Modal>
    );
  }
}

export default Auth;