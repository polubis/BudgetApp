import React from 'react';

import Modal from '../../components/common/Modal/Modal';
import AuthHeader from '../../components/auth/AuthHeader/AuthHeader';
import Commercial from '../../components/auth/Commercial/Commercial';
import WithLazyLoading from '../../hoc/WithLazyLoading';

import LaptoptImg from './assets/laptop.jpg';
import LaptopStatsImg from './assets/laptop-stats.jpg';

import './Auth.scss';

const Login = WithLazyLoading(() => import('./Login/index'));

const Register = WithLazyLoading(() => import('./Register/index'));

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