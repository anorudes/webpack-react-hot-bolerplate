var ASSETS_PATH  = require('./paths').ASSETS_PATH;

var cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 2,
    camelCase: true,
    localIdentName: '[folder]__[local]___[hash:base64:5]'
  }
};

var sassLoader = {
  loader: 'sass-loader',
  options: {
    outputStyle: 'expanded',
    includePaths: ASSETS_PATH
  }
};

module.exports = {
  cssLoader,
  sassLoader
};
