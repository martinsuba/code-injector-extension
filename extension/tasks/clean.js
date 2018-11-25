const del = require('del');

module.exports = function clean() {
  const toDelete = ['build/**', '!build'];

  return del(toDelete);
};
