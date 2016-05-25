var webpack = require('webpack');
var path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets:['react']},
      },
      {
        test: /\.s?css$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
    ],
  },

  entry: './src/react-tag-list.js',

  output: {
    library: 'ReactTagList',
    libraryTarget: 'umd',
    path: 'dist',
    filename: 'react-tag-list.js',
  },

  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'classnames': {
      root: 'classNames',
      commonjs: 'classnames',
      commonjs2: 'classnames',
      amd: 'classnames',
    },
    'dom.position': {
      root: 'position',
      commonjs: 'dom.position',
      commonjs2: 'dom.position',
      amd: 'dom.position',
    },
    'element-size': {
      root: 'elementSize',
      commonjs: 'element-size',
      commonjs2: 'element-size',
      amd: 'element-size',
    },
    'react-event-listener': {
      root: 'EventsMixin',
      commonjs: 'react-event-listener',
      commonjs2: 'react-event-listener',
      amd: 'react-event-listener',
    },
  },

  node: {
    Buffer: false
  },

};
