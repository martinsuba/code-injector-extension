const path = require('path');
const del = require('del');

module.exports = function clean() {
  const toDelete = [path.resolve(__dirname, '../../extension/build/services')];

  return del(toDelete);
};
