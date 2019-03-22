import { FormSettings } from 'FormTypes';

export default {
  email: {
    appearance: {title: 'email', icon: 'email'},
    logic: {value: '', validators: { required: true, minLength: 3, maxLength: 25 }}
  },
  password: {
    appearance: {title: 'password', icon: 'lock'},
    logic: {value: '', validators: { required: true, minLength: 5, maxLength: 25 } }
  }
} as FormSettings;