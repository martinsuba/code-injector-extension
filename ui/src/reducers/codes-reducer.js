import {
  ADD_CODE, DELETE_CODE, EDIT_CODE, SET_ACTIVE_CODE, FETCH_CODES, FETCH_CODES_PENDING, FETCH_CODES_ERROR,
} from '../actions/action-types';
import { sortCodes, setFirstActive } from '../utils';

const initialState = {
  loading: false,
  items: [],
};

export default function codesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CODE: {
      const codes = setFirstActive(sortCodes([...state.items, action.payload]));
      return {
        ...state,
        items: codes,
      };
    }
    case DELETE_CODE: {
      const deletedCode = action.payload;
      const newCodes = [...state.items.filter(code => code.id !== deletedCode.id)];
      const codes = deletedCode.active ? setFirstActive(sortCodes(newCodes)) : sortCodes(newCodes);
      return {
        ...state,
        items: codes,
      };
    }
    case EDIT_CODE: {
      const updatedCode = action.payload;
      const codes = sortCodes([...state.items.filter(code => code.id !== updatedCode.id), updatedCode]);
      return {
        ...state,
        items: codes,
      };
    }
    case SET_ACTIVE_CODE: {
      const codeId = action.payload;
      const codes = [...state.items.map((code) => {
        if (code.id === codeId) {
          code.active = true;
        } else {
          code.active = false;
        }
        return code;
      })];
      return {
        ...state,
        items: codes,
      };
    }
    case FETCH_CODES_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_CODES: {
      const codes = setFirstActive(sortCodes([...action.payload]));
      return {
        ...state,
        items: codes,
        loading: false,
      };
    }
    case FETCH_CODES_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
}
