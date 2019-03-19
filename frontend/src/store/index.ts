import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose, Store } from 'redux';

import rootReducer from './root-reducer';
import rootEpic from './root-epic';

const initializeStore = (): Store => {
  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    rootReducer, 
    composeEnhancers(
      applyMiddleware(epicMiddleware)
    )
  );
  
  epicMiddleware.run(rootEpic);

  return store;
}

export default initializeStore();

