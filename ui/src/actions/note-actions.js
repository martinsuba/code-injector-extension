import {
  ADD_NOTE, DELETE_NOTE, EDIT_NOTE, SET_ACTIVE_NOTE,
} from './action-types';

export const addNote = note => ({ type: ADD_NOTE, payload: note });
export const deleteNote = noteId => ({ type: DELETE_NOTE, payload: noteId });
export const editNote = note => ({ type: EDIT_NOTE, payload: note });
export const setActiveNote = noteId => ({ type: SET_ACTIVE_NOTE, payload: noteId });
