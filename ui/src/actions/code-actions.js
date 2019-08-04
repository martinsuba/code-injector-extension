import {
  ADD_CODE, DELETE_CODE, EDIT_CODE, SET_ACTIVE_CODE,
} from './action-types';

export const addCode = code => ({ type: ADD_CODE, payload: code });
export const deleteCode = code => ({ type: DELETE_CODE, payload: code });
export const editCode = code => ({ type: EDIT_CODE, payload: code });
export const setActiveCode = codeId => ({ type: SET_ACTIVE_CODE, payload: codeId });
