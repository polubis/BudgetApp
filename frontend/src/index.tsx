import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';

import { Provider } from 'react-redux';

import store from './store/index';

import * as serviceWorker from './serviceWorker';

// import './index';

import './index.scss';

WebFont.load({
  google: {
    families: ['Material+Icons', 'Roboto:300,400,500,700', 'sans-serif']
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
