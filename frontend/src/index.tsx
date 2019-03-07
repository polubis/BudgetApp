import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';

import * as serviceWorker from './serviceWorker';

import './index.scss';

ReactDOM.render(
  <App />, document.getElementById('root')
);

WebFont.load({
  google: {
    families: ['Material+Icons', 'Roboto:300,400,500,700', 'sans-serif']
  }
});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
