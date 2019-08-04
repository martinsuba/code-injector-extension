import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducers from './reducers';
import { saveState } from './utils';

const store = createStore(reducers, applyMiddleware(logger));

store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

export default store;
