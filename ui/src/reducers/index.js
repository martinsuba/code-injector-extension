import { combineReducers } from 'redux';

import { ADD_ARTICLE } from '../actions/action-types';

const initialState = [];

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return [...state, action.payload];
    default:
      return state;
  }
};

const reducers = combineReducers({
  articles: articleReducer,
  // notes: notesReducer,
});

export default reducers;
