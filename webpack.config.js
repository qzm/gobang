const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
    },{
      test: /\.less$/,
      use: [
        { loader: "style-loader/url" },
        {
          loader: "file-loader", options: {
            name: 'style.[hash:8].min.css'
          }
        },
        // autoprefixer,cssnano
        { loader: "postcss-loader" },
        { loader: "less-loader" },
      ]
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
    // 删除多余的bundle
    new CleanWebpackPlugin( ['dist/bundle.*.js'], {
        root: __dirname,
        verbose: true,
        dry: false
      }
    )
  ],

};
