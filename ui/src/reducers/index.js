import { combineReducers } from 'redux';

import {
  ADD_NOTE, DELETE_NOTE, EDIT_NOTE, SET_ACTIVE_NOTE,
} from '../actions/action-types';
import { sortNotes } from '../utils';

// NOTE: mock for dev
// const initialState = [];
const initialState = [
  {
    id: '736cd069-696b-41ac-bd17-6b78bc9e0c4f', title: 'a', type: 'plain', createdAt: 1556190211456, updatedAt: null, content: {}, active: false,
  },
  {
    id: '03074e9a-36ea-4987-808f-d7a5a3488bb9', title: 'b', type: 'plain', createdAt: 1556190217009, updatedAt: null, content: {}, active: true,
  },
];

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
