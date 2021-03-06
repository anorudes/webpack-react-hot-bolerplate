var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var PATHS = require('./paths');

var DEVELOPMENT_CONFIG = {
  entry: {
    client: [
      'react-hot-loader/patch',
      PATHS.HOT_ONLY_ENTRY
    ]
  },

  cache: true,

  devServer: {
    hot: true,
    port: 9001,
    inline: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    stats: {
      assets: true,
      timings: true,
      chunks: false,
      children: false
    }
  },

  output: {
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new htmlWebpackPlugin({
      title: 'react webpack-2 react-hot-loader-v3 react-router-v4 boilerplate',
      template: './config/index.ejs'
    }),
    new WatchMissingNodeModulesPlugin(PATHS.NODE_MODULES_PATH)
  ]
};

module.exports = DEVELOPMENT_CONFIG;
