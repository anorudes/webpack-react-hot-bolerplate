var path = require('path');

var ROOT_PATH = path.resolve(__dirname, '..');

function resolvePath(relativePath) {
  return path.resolve(ROOT_PATH, relativePath);
}

module.exports = {
  APP_PATH: resolvePath('src'),
  DIST_PATH: resolvePath('dist'),
  NODE_MODULES_PATH: resolvePath('node_modules'),
  ASSETS_PATH: resolvePath('src/assets'),
  HOT_ONLY_ENTRY: resolvePath('src/hot')
};
