const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

console.log(__dirname);

module.exports = {
  entry: {
    app: __dirname + '/src/app.js'
  },
  output: {
    filename: 'bundle.[hash:8].min.js',
    path: __dirname + '/docs'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'es2015', 'stage-2']
      },
      include: [__dirname + '/src']
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract([
        "css-loader",
        "postcss-loader",
        "less-loader"
      ])
    }]

  },
  plugins: [
    // service worker
    new SWPrecacheWebpackPlugin({
      cacheId: 'gobang-cache',
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("style.[hash:8].min.css"),
    // HTML注入js
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    // 删除多余的bundle,Style,index文件
    new CleanWebpackPlugin([
      'docs/*',
    ], {
      root: __dirname,
      verbose: true,
      dry: false,
      "watch": true
    })
  ],

};
