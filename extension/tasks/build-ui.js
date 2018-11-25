const execa = require('execa');

module.exports = function buildUi() {
  const command = 'cd ../ui && npm run build';
  const task = execa.shell(command, { env: { FORCE_COLOR: true } });
  task.stdout.pipe(process.stdout);
  task.stderr.pipe(process.stderr);
  return task;
};
