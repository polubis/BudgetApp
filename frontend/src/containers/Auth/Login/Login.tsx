import React from 'react';

import Button from '../../../components/ui/Button/Button';
import Form from '../../../components/common/Form/Form';
import LoginFormSettings from './form-config';

import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

import './Login.scss';

const Login = () => (
  <>
    <Form 
      btnTitle='Log in'
      btnClasses='bg-btn bg-btn--main btn--medium login-btn'
      settings={LoginFormSettings}
      actionAfterSubmit={values => console.log(values)}
    />

    <FacebookLogin 
      appId="2181257188618368"
      cssClass='facebook-btn click'
      fields="name,email,picture"
      callback={(data: ReactFacebookLoginInfo) => console.log(data)}
    />

    <Button 
      id='forgot-pass-btn'
      size='14'
      action={() => {}}
      classes='txt-btn txt-btn--l-font'
      title='forgot password?'
    />
  </>
  
);

export default Login;