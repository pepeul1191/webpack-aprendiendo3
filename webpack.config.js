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

var output_development = {
  path: path.resolve(__dirname, 'public/dist'),
  filename: '[name].js',
};

var output_production = {
  path: path.resolve(__dirname, 'public/dist'),
  filename: '[name].min.js',
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

var config = {
  entry: entries,
  plugins: plugins,
  optimization: optimization,
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.output = output_development;
  }

  if (argv.mode === 'production') {
    config.output = output_production;
  }

  return config;
};