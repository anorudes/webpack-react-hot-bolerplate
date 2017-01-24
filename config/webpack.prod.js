var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var PATHS = require('./paths');
var loaders = require('./loaders');

const PRODUCTION_CONFIG = {
  entry: {
    client: [
      PATHS.APP_PATH
    ]
  },

  output: {
    path: PATHS.DIST_PATH,
    filename: '[name]-[chunkhash].bundle.js',
    chunkFilename: '[id]-[chunkhash].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        include: PATHS.APP_PATH,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [loaders.cssLoader, 'postcss-loader', loaders.sassLoader]
        })
      }
    ]
  },

  performance: {
    hints: 'warning'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      disable: false,
      allChunks: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true
    }),

    new ManifestPlugin({
      fileName: 'webpack-asset-manifest.json'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    new WebpackMd5Hash()
  ]
};

module.exports = PRODUCTION_CONFIG;
