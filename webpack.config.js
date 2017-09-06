const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const path = require('path');

console.log(__dirname);

const webpackModule = {
  entry: {
    app: path.resolve(__dirname + '/src/app.js')
  },
  output: {
    filename: 'bundle.[hash:8].min.js',
    path: path.resolve(__dirname + '/dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'es2015', 'stage-2']
      },
      include: [path.resolve(__dirname + '/src')]
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
  ],

};
if (process.env.NODE_ENV_REPORT) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackModule.plugins.push(new BundleAnalyzerPlugin())
}

console.log('====================================');
console.log(process.env);
console.log('====================================');
if (process.env.NODE_ENV === 'production') {
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  // 删除多余的bundle,Style,index文件
  webpackModule.plugins.push(new CleanWebpackPlugin([
    'dist/*',
  ], {
    root: __dirname,
    verbose: true,
    dry: false,
    "watch": true
  }));
}
module.exports = webpackModule;
