import React, { useEffect } from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

import Button from '../../../components/ui/Button/Button';
import Form from '../../../components/common/Form/Form';
import LoginFormSettings from './form-config';

import { LogInPayload } from '../../../features/Auth/models';
import { ILogin, ILoginMethods } from './index';

import './Login.scss';

const Login = ({isInAuthProcess, logIn, authCancelled}: ILogin & ILoginMethods) => {

  useEffect(() => {
    return () => authCancelled();
  }, []);

  return (
    <>
      <Form 
        btnTitle='Log in'
        btnClasses='bg-btn bg-btn--main btn--medium login-btn'
        settings={LoginFormSettings}
        actionAfterSubmit={values => logIn(values as LogInPayload)}
        isOnSubmit={isInAuthProcess}
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
  
}

export default Login;