const path = require('path');
const webpack = require('webpack');

var entries = {
  main: './resources/index.js',
  vendors: ['backbone', 'jquery', ],
  vendors_login: ['jquery', ],
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

var optimization = {
  splitChunks: {
    cacheGroups: {       
      vendor: {
        test: /node_modules/,
        name: 'vendors',
        chunks: 'all', 
        enforce: true
      }
    }
  }
}

module.exports = {
  entry: entries,
  plugins: plugins,
  output: output,
  optimization: optimization,
};