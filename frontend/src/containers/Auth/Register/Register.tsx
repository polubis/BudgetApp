import React, { useEffect } from 'react';
import RegisterFormSettings from './form-config';

import Form from '../../../components/common/Form/Form';

import { CreateUserPayload } from '../../../features/Auth/models';
import { IRegister, IRegisterMethods } from './index';

import './Register.scss';

const Register = ({createUser, isCreatingAccount, authCancelled}: IRegister & IRegisterMethods) => {

  useEffect(() => {
    return () => authCancelled();
  }, []);

  return (
    <Form 
      formClass='register-form col'
      btnTitle='Create account'
      btnClasses='bg-btn bg-btn--main btn--medium login-btn'
      settings={RegisterFormSettings}
      actionAfterSubmit={values => createUser(values as CreateUserPayload)}
      isOnSubmit={isCreatingAccount}
    />
  );
}

export default Register;