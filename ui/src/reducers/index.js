import { combineReducers } from 'redux';

import codesReducer from './codes-reducer';

const reducers = combineReducers({
  codes: codesReducer,
});

export default reducers;
