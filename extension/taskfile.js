/* eslint-disable global-require */
(async function taskRunner() {
  try {
    const taskName = process.argv[2];
    const clean = require('./tasks/clean');

    if (taskName === 'clean') {
      await clean();
    }

    if (taskName === 'build') {
      const buildUi = require('./tasks/build-ui');
      const buildExtension = require('./tasks/build-extension');
      const buildServices = require('./tasks/build-services');

      await clean();
      await buildUi();
      await buildExtension();
      await buildServices();
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}());
