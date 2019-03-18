import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';

import { createEpicMiddleware } from 'redux-observable';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers';

import * as serviceWorker from './serviceWorker';

import './index.scss';

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({...reducers});

const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
);

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
