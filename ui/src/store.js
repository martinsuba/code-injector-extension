import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { saveState } from './utils/storage';

const store = createStore(reducers, applyMiddleware(thunk, logger));

store.subscribe(() => {
  const state = store.getState();
  if (!state.codes.loading) {
    saveState(state);
  }
});

export default store;
