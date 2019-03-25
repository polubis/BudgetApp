import { FormSettings } from 'FormTypes';

export default {
  username: {
    appearance: {title: 'username', icon: 'email'},
    logic: {value: '', validators: { required: true, minLength: 2, maxLength: 25 }}
  },
  email: {
    appearance: {title: 'email', icon: 'person', inputSettings: { type: 'email' }},
    logic: {value: '', validators: { required: true, minLength: 5, maxLength: 254 } }
  },
  password: {
    appearance: {title: 'password', icon: 'lock', inputSettings: { type: 'password' }},
    logic: {value: '', validators: { required: true, minLength: 8, maxLength: 20 }}
  },
  repeatedPassword: {
    appearance: {title: 'repeated password', icon: 'lock', inputSettings: { type: 'password' }},
    logic: {value: '', validators: { required: true, minLength: 8, maxLength: 20 } }
  }
} as FormSettings;