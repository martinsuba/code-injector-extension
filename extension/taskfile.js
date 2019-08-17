const buildUi = require('./tasks/build-ui');
const buildExtension = require('./tasks/build-extension');

(async () => {
  try {
    await buildUi();
    await buildExtension();
  } catch (e) {
    console.error(e);
  }
})();
