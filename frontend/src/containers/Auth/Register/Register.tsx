import React, { useEffect } from 'react';
import RegisterFormSettings from './form-config';

import Form from '../../../components/common/Form/Form';

import { CreateAccountPayload } from '../../../features/Auth/models';

import './Register.scss';

type RegisterProps = {
  createAccount: (values: CreateAccountPayload) => any;
  clearAlerts: () => any;
  isCreatingAccount: boolean;
}

const Register = ({createAccount, isCreatingAccount, clearAlerts}: RegisterProps) => {

  useEffect(() => {
    return () => clearAlerts();
  }, []);

  return (
    <Form 
      formClass='register-form col'
      btnTitle='Submit'
      btnClasses='bg-btn bg-btn--main btn--medium login-btn'
      settings={RegisterFormSettings}
      actionAfterSubmit={values => createAccount(values as CreateAccountPayload)}
      isOnSubmit={isCreatingAccount}
    />
  );
}

export default Register;