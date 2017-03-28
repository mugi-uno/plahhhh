// const webpack = require('webpack');
// const path = require('path');

module.exports = {
  entry: {
    'client.bundle': ['babel-polyfill', './client/index.js']
  },
  output: {
    filename: './public/javascripts/[name].js',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('postcss-cssnext')(),
          ]
        }
      }
    ]
  },
  node: {
    fs: 'empty',
    tls: 'empty'
  }
};
