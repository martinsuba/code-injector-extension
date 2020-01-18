import { syncStorage } from 'extension-storage-promise';

const STORAGE_NAME = 'SE_STATE';

function getNumberFromRecord(name) {
  return Number(name.substr(STORAGE_NAME.length + 1));
}

export async function loadCodes() {
  const storage = await syncStorage.getAllRecords();
  const values = Object.entries(storage)
    .filter(entry => entry[0].includes(`${STORAGE_NAME}_`))
    .sort((a, b) => getNumberFromRecord(a[0]) - getNumberFromRecord(b[0]))
    .map(entry => entry[1]);

  const state = JSON.parse(values.join(''));

  if (state == null) {
    return [];
  }

  return state.codes.items;
}
