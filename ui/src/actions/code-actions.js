import {
  ADD_CODE, DELETE_CODE, EDIT_CODE, SET_ACTIVE_CODE, FETCH_CODES, FETCH_CODES_PENDING, FETCH_CODES_ERROR,
} from './action-types';

export const addCode = code => ({ type: ADD_CODE, payload: code });
export const deleteCode = code => ({ type: DELETE_CODE, payload: code });
export const editCode = code => ({ type: EDIT_CODE, payload: code });
export const setActiveCode = codeId => ({ type: SET_ACTIVE_CODE, payload: codeId });
export const fetchCodes = codes => ({ type: FETCH_CODES, payload: codes });
export const fetchCodesPending = () => ({ type: FETCH_CODES_PENDING });
export const fetchCodesError = error => ({ type: FETCH_CODES_ERROR, payload: error });
