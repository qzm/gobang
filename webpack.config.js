const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log(__dirname);

module.exports = {
  entry: {
    app: __dirname + '/src/app.js'
  },
  output: {
    filename: 'bundle.[hash:8].min.js',
    path: __dirname + '/dist'
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
      'dist/*',
    ], {
      root: __dirname,
      verbose: true,
      dry: false,
      "watch": true
    })
  ],

};
