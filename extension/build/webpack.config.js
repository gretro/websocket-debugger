const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const paths = require('./paths')
const { isDev } = require('./env')

const webpackConfig = {
  entry: {
    content_script: paths.src('content_script/index.ts'),
    background: paths.src('background/index.ts'),
    devtools: paths.src('devtools/devtools.ts'),
    panel: paths.src('devtools/panel/index.tsx'),
  },
  output: {
    path: paths.dist(),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: paths.base('static'),
    hot: true,
    hotOnly: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: paths.base('static') }, { from: paths.src('devtools/devtools.html') }]),
    new HtmlWebpackPlugin({
      filename: 'devtools.html',
      template: paths.src('devtools/devtools.html'),
      chunks: ['devtools'],
    }),
    new HtmlWebpackPlugin({
      filename: 'devtools_panel.html',
      template: paths.src('devtools/panel/panel.html'),
      chunks: ['panel'],
    }),
  ],
}

if (isDev) {
  console.log('Dev mode detected')

  webpackConfig.mode = 'development'

  const TSLintPlugin = require('tslint-webpack-plugin')

  // For production, linting is called on it's own.
  webpackConfig.plugins.push(
    new TSLintPlugin({
      files: [paths.src('**/*.ts'), paths.src('**/*.tsx')],
      config: paths.base('tslint.json'),
      project: paths.base('tsconfig.json'),
      typeCheck: true,
    }),
    new WriteFilePlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = webpackConfig
