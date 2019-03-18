import React from 'react';

import Form, { FormSettings } from '../../../components/common/Form/Form';

import './Register.scss';

const RegisterFormSetting: FormSettings = {
  username: {
    appearance: {title: 'username', icon: 'email'},
    logic: {value: '', validators: { required: true, minLength: 3, maxLength: 25 }}
  },
  email: {
    appearance: {title: 'email', icon: 'person'},
    logic: {value: '', validators: { required: true, minLength: 5, maxLength: 25 } }
  },
  password: {
    appearance: {title: 'password', icon: 'lock'},
    logic: {value: '', validators: { required: true, minLength: 3, maxLength: 25 }}
  },
  repeatedPassword: {
    appearance: {title: 'repeated password', icon: 'lock'},
    logic: {value: '', validators: { required: true, minLength: 5, maxLength: 25 } }
  }
}

const Register = () => (
  <>
    <Form 
      formClass='register-form col'
      btnTitle='Submit'
      btnClasses='bg-btn bg-btn--main btn--medium login-btn'
      settings={RegisterFormSetting}
      actionAfterSubmit={values => console.log(values)}
    />
  </>
  
);

export default Register;