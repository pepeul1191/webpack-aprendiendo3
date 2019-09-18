const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

var entries = {
  main: ['./resources/entries/index.js'],
  vendors: ['backbone', 'jquery', ],
  vendors_login: ['jquery', ],
};

var plugins = [
  new webpack.ProvidePlugin({
    // import globally this libs
    $: 'jquery',
    'Backbone': 'backbone',
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
  new CopyPlugin([
    // move ejs files to public
    { 
      from: 'resources/templates', 
      to: '../templates' 
    },
  ]),
];

var output_development = {
  path: path.resolve(__dirname, 'public/dist'),
  filename: '[name].js',
};

var output_production = {
  path: path.resolve(__dirname, 'public/dist'),
  filename: '[name].min.js',
};

var rules = [
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          publicPath: '../'
        }
      },
      'css-loader'
    ]
  },
];

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
};

var config = {
  entry: entries,
  plugins: plugins,
  optimization: optimization,
  module: {
    rules: rules,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.output = output_development;
    config.watch = true;
  }
  if (argv.mode === 'production') {
    config.output = output_production;
    config.watch = false;
  }
  return config;
};