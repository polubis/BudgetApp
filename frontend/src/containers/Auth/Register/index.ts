export default {
  username: {
    appearance: {title: 'username', icon: 'email'},
    logic: {value: '', validators: { required: true, minLength: 2, maxLength: 25 }}
  },
  email: {
    appearance: {title: 'email', icon: 'person'},
    logic: {value: '', validators: { required: true, minLength: 5, maxLength: 254 } }
  },
  password: {
    appearance: {title: 'password', icon: 'lock'},
    logic: {value: '', validators: { required: true, minLength: 8, maxLength: 20 }}
  },
  repeatedPassword: {
    appearance: {title: 'repeated password', icon: 'lock'},
    logic: {value: '', validators: { required: true, minLength: 8, maxLength: 20 } }
  }
}