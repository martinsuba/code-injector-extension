const STORAGE_NAME = 'SE_STATE';

export async function loadCodes() {
  return new Promise((resolve, reject) => {
    try {
      window.chrome.storage.sync.get(STORAGE_NAME, ({ [STORAGE_NAME]: state }) => {
        if (state == null) {
          resolve([]);
        } else {
          resolve(state.codes.items);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
