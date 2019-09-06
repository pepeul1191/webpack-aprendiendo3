const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './resources/index.js',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      'Backbone': 'backbone',
    })
],
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js'
  }
};