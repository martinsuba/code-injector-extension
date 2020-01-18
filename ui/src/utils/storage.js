import { syncStorage } from 'extension-storage-promise';
import { fetchCodes, fetchCodesPending, fetchCodesError } from '../actions/code-actions';

const STORAGE_NAME = 'SE_STATE';
const initialState = {
  loading: false,
  items: [],
};

function splitRecord(key, record) {
  let stringRecord = JSON.stringify(record);
  let i = 0;
  const storageObj = {};

  // split stringRecord into chunks and store them in an object indexed by `key_i`
  while (stringRecord.length > 0) {
    const index = `${key}_${i++}`;

    const valueLength = window.chrome.storage.sync.QUOTA_BYTES_PER_ITEM - index.length - 50;
    let adjustedValueLength = valueLength;
    let segment = stringRecord.substr(0, valueLength);

    while (JSON.stringify(segment).length > valueLength) {
      adjustedValueLength -= 100;
      segment = stringRecord.substr(0, adjustedValueLength);
    }

    storageObj[index] = segment;
    stringRecord = stringRecord.substr(valueLength);
  }

  return storageObj;
}

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

function getNumberFromRecord(name) {
  return Number(name.substr(STORAGE_NAME.length + 1));
}

async function loadState() {
  const storage = await syncStorage.getAllRecords();
  const values = Object.entries(storage)
    .filter(entry => entry[0].includes(`${STORAGE_NAME}_`))
    .sort((a, b) => getNumberFromRecord(a[0]) - getNumberFromRecord(b[0]))
    .map(entry => entry[1]);

  const state = JSON.parse(values.join(''));

  if (state == null) {
    return initialState;
  }

  return state;
  // return stateMock
}

export async function saveState(state) {
  try {
    const records = splitRecord(STORAGE_NAME, state);
    const storage = await syncStorage.getAllRecords();
    const existingKeys = Object.entries(storage)
      .filter(entry => entry[0].includes(`${STORAGE_NAME}_`))
      .map(entry => entry[0]);

    await syncStorage.removeRecords(existingKeys);
    await syncStorage.setRecords(records);
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
