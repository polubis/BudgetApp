import React from 'react';
import RegisterFormSettings from './form-config';

import Form from '../../../components/common/Form/Form';

import { CreateAccountPayload } from '../../../features/Auth/models';
import { IRegister, IRegisterMethods } from './index';

import './Register.scss';

const Register = ({createAccount, isCreatingAccount}: IRegister & IRegisterMethods) => {

  return (
    <Form 
      formClass='register-form col'
      btnTitle='Create account'
      btnClasses='bg-btn bg-btn--main btn--medium login-btn'
      settings={RegisterFormSettings}
      actionAfterSubmit={values => createAccount(values as CreateAccountPayload)}
      isOnSubmit={isCreatingAccount}
    />
  );
}

export default Register;