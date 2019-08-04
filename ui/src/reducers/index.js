import { combineReducers } from 'redux';

import {
  ADD_CODE, DELETE_CODE, EDIT_CODE, SET_ACTIVE_CODE,
} from '../actions/action-types';
import { sortCodes, loadState, setFirstActive } from '../utils';

// TODO: only codes state, refactor
const initialState = loadState().codes || [];

const codesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CODE: {
      const newState = [...state, action.payload];
      return setFirstActive(sortCodes(newState));
    }
    case DELETE_CODE: {
      const deletedCode = action.payload;
      const newState = state.filter(code => code.id !== deletedCode.id);
      return deletedCode.active ? setFirstActive(sortCodes(newState)) : sortCodes(newState);
    }
    case EDIT_CODE: {
      const updatedCode = action.payload;
      const newState = [...state.filter(code => code.id !== updatedCode.id), updatedCode];
      return sortCodes(newState);
    }
    case SET_ACTIVE_CODE: {
      const codeId = action.payload;
      return state.map((code) => {
        if (code.id === codeId) {
          code.active = true;
        } else {
          code.active = false;
        }
        return code;
      });
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  codes: codesReducer,
});

export default reducers;
