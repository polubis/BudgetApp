import { FormSettings } from 'FormTypes';

export default {
  username: {
    appearance: {title: 'username', icon: 'person'},
    logic: {value: '', validators: { required: true, minLength: 3, maxLength: 25 }}
  },
  password: {
    appearance: {title: 'password', icon: 'lock'},
    logic: {value: '', validators: { required: true, minLength: 5, maxLength: 25 } }
  }
} as FormSettings;