var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var cssnano = require('cssnano');
var path = require('path');
var loaders = require('./config/loaders');
var PATHS = require('./config/paths');
var DEVELOPMENT_CONFIG = require('./config/webpack.dev');
var PRODUCTION_CONFIG  = require('./config/webpack.prod');
var ENV = process.env.NODE_ENV;
var VALID_ENVIRONMENTS = ['test', 'development', 'production'];

if (VALID_ENVIRONMENTS.indexOf(ENV) === -1) {
  throw new Error(`${ ENV } is not valid environment!`);
}

var config = {
  development: DEVELOPMENT_CONFIG,
  production:  PRODUCTION_CONFIG
}[ENV];

var COMMON_CONFIG = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-addons-shallow-compare',
      'redux',
      'react-redux',
      'redux-thunk',
      'react-router',
      'immutable'
    ]
  },

  output: {
    path: PATHS.DIST_PATH,
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: PATHS.APP_PATH,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.sass$/,
        include: PATHS.APP_PATH,
        use: ['style-loader', loaders.cssLoader, 'postcss-loader', loaders.sassLoader]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.sass'],
    modules: [
      PATHS.NODE_MODULES_PATH,
      PATHS.APP_PATH
    ],
    alias: {
      components: path.resolve(PATHS.APP_PATH, 'components'),
      config:     path.resolve(PATHS.APP_PATH, 'config'),
      reducers:   path.resolve(PATHS.APP_PATH, 'reducers')
    }
  },

  performance: {
    hints: false
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),

    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: /vendor.*\.js$/
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          emitWarning: true
        },
        postcss: [
          cssnano({
            sourcemap: true,
            autoprefixer: {
              add: true,
              remove: true,
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9'
              ]
            },
            safe: true,
            discardComments: {
              removeAll: true
            }
          })
        ]
      }
    })
  ]
};

module.exports = webpackMerge.smart(COMMON_CONFIG, config);
