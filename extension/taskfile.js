const { argv } = require('yargs');
const buildUi = require('./tasks/build-ui');
const buildExtension = require('./tasks/build-extension');

(async () => {
  try {
    await buildUi();
    await buildExtension(argv.mode);
  } catch (e) {
    console.error(e);
  }
})();
