import { combineReducers } from 'redux';

import {
  ADD_NOTE, DELETE_NOTE, EDIT_NOTE, SET_ACTIVE_NOTE,
} from '../actions/action-types';
import { sortNotes, loadState } from '../utils';

// TODO: only notes state, refactor
const initialState = loadState().notes || [];

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE: {
      const newState = [...state, action.payload];
      return sortNotes(newState);
    }
    case DELETE_NOTE: {
      const deletedNoteId = action.payload;
      const newState = state.filter(note => note.id !== deletedNoteId);
      return sortNotes(newState);
    }
    case EDIT_NOTE: {
      const updatedNote = action.payload;
      const newState = [...state.filter(note => note.id !== updatedNote.id), updatedNote];
      return sortNotes(newState);
    }
    case SET_ACTIVE_NOTE: {
      const noteId = action.payload;
      return state.map((note) => {
        if (note.id === noteId) {
          note.active = true;
        } else {
          note.active = false;
        }
        return note;
      });
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  notes: notesReducer,
});

export default reducers;
