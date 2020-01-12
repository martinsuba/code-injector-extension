import { syncStorage } from 'extension-storage-promise';

const STORAGE_NAME = 'SE_STATE';

export async function loadCodes() {
  const state = await syncStorage.getOneRecord(STORAGE_NAME);
  if (state == null) {
    return [];
  }

  return state.codes.items;
}
