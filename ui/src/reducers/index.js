import { combineReducers } from 'redux';

import {
  ADD_NOTE, DELETE_NOTE, EDIT_NOTE, SET_ACTIVE_NOTE,
} from '../actions/action-types';

const initialState = [];

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, action.payload];
    case DELETE_NOTE: {
      const noteId = action.payload;
      return state.filter(note => note.id !== noteId);
    }
    case EDIT_NOTE: {
      const updatedNote = action.payload;
      const newState = state.filter(note => note.id !== updatedNote.id);
      return [...newState, updatedNote];
    }
    default:
      return state;
  }
};

const activeNoteReducer = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_NOTE:
      return action.payload;
    default:
      return state;
  }
};

const reducers = combineReducers({
  notes: notesReducer,
  activeNote: activeNoteReducer,
});

export default reducers;
