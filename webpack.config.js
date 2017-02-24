/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
  SRC: path.resolve(__dirname, 'src'),
  DEST: path.resolve(__dirname, 'dist'),
}

const config = {
  entry: {
    main: paths.SRC,
  },
  output: {
    path: paths.DEST,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.(frag|vert)$/,
      exclude: /node_modules/,
      use: 'raw-loader',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(paths.SRC, 'index.html') }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: 'errors-only',
  },
  devtool: 'source-map',
}

module.exports = config
