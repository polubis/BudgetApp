import React from 'react';

import Button from '../../../components/ui/Button/Button';
import Form, { FormSettings } from '../../../components/common/Form/Form';

import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

import './Login.scss';

const LoginFormSettings: FormSettings = {
  email: {
    appearance: {title: 'email', icon: 'email'},
    logic: {value: '', validators: { required: true, minLength: 3, maxLength: 25 }}
  },
  password: {
    appearance: {title: 'password', icon: 'lock'},
    logic: {value: '', validators: { required: true, minLength: 5, maxLength: 25 } }
  }
}

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