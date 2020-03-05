/**
 * Webpack config to pack documentation page
 */
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const env = process.env.NODE_ENV

const webpackConfig = {
  mode: env === 'development' ? 'development' : 'production',
  entry: './demo/deploymentIndex.js',
  output: {
    path: path.resolve(__dirname, '..', 'doc', 'dist'),
    publicPath: '/',
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[hash:7].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.entry'],
    alias: config.alias,
    modules: ['node_modules']
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: config.docLoaders
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.tpl',
      favicon: './demo/assets/images/naivelogo.svg'
    }),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    }),
    new ExtractTextPlugin('[name].[hash:7].css')
  ]
}

module.exports = webpackConfig
