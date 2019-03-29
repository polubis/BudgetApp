import { createEpicMiddleware } from 'redux-observable';
import { RootAction, RootState } from 'StoreTypes';
import { createStore, applyMiddleware, compose, Store } from 'redux';

import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import loggerMiddleware from './logger-middleware';

const initializeStore = (): Store => {
  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

  const initialState = {};

  const store = createStore(
    rootReducer, 
    initialState,
    composeEnhancers(
      applyMiddleware(
        epicMiddleware,
        loggerMiddleware
      )
    )
  );
  
  epicMiddleware.run(rootEpic);

  return store;
}

const store = initializeStore();

export default store;

