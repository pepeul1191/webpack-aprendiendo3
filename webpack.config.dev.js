const path = require('path');
const webpack = require('webpack');

var entry = {
  main: './resources/index.js',
};

var plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    'Backbone': 'backbone',
  }),
];

var output = {
  path: path.resolve(__dirname, 'public/dist'),
  filename: '[name].bundle.js',
};

module.exports = {
  entry: entry,
  plugins: plugins,
  output: output,
};