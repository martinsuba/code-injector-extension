import { syncStorage } from 'extension-storage-promise';
import { fetchCodes, fetchCodesPending, fetchCodesError } from '../actions/code-actions';

const STORAGE_NAME = 'SE_STATE';
const initialState = {
  loading: false,
  items: [],
};

// NOTE: for developing UI without extension storage
// const stateMock = {
//   codes: {
//     items: [
//       {
//         id: '736cd069-696b-41ac-bd17-6b78bc9e0c4f', site: 'a', createdAt: 1556190211456, updatedAt: null, content: 'abc', active: false,
//       },
//       {
//         id: '03074e9a-36ea-4987-808f-d7a5a3488bb9', site: 'b', createdAt: 1556190217009, updatedAt: null, content: 'xyz', active: true,
//       },
//     ],
//   },
// };

async function loadState() {
  const state = await syncStorage.getOneRecord(STORAGE_NAME);
  if (state == null) {
    return initialState;
  }

  return state;
  // return stateMock
}

export async function saveState(state) {
  try {
    await syncStorage.setOneRecord(STORAGE_NAME, state);
  } catch (err) {
    console.error(err);
  }
}

export function getCodes() {
  return (dispatch) => {
    dispatch(fetchCodesPending());
    loadState()
      .then((res) => {
        dispatch(fetchCodes(res.codes.items));
        return res.codes.items;
      })
      .catch(error => dispatch(fetchCodesError(error)));
  };
}
