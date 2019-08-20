import { fetchCodes, fetchCodesPending, fetchCodesError } from '../actions/code-actions';

const STORAGE_NAME = 'SE_STATE';

// NOTE: for developing UI without extension storage
const stateMock = {
  codes: {
    items: [
      {
        id: '736cd069-696b-41ac-bd17-6b78bc9e0c4f', site: 'a', createdAt: 1556190211456, updatedAt: null, content: 'abc', active: false,
      },
      {
        id: '03074e9a-36ea-4987-808f-d7a5a3488bb9', site: 'b', createdAt: 1556190217009, updatedAt: null, content: 'xyz', active: true,
      },
    ],
  },
};

async function loadState() {
  return new Promise((resolve, reject) => {
    try {
      window.chrome.storage.sync.get(STORAGE_NAME, ({ [STORAGE_NAME]: state }) => {
        resolve(state);
      });
    } catch (err) {
      // reject(err);
      resolve(stateMock);
    }
  });
}

export function saveState(state) {
  try {
    window.chrome.storage.sync.set({ [STORAGE_NAME]: state });
  } catch (err) {
    // console.error(err);
  }
}

export function getCodes() {
  return (dispatch) => {
    dispatch(fetchCodesPending());
    loadState()
      .then((res) => {
        if (res.error) {
          throw (res.error);
        }
        dispatch(fetchCodes(res.codes.items));
        return res.codes.items;
      })
      .catch(error => fetchCodesError(error));
  };
}
