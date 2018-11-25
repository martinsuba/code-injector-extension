/* eslint-disable global-require */
(async function taskRunner() {
  try {
    const taskName = process.argv[2];
    const clean = require('./tasks/clean');

    if (taskName === 'clean') {
      await clean();
    }

    if (taskName === 'build') {
      const build = require('./tasks/build');

      // await clean();
      await build();
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}());
