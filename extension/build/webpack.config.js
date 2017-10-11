const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = require('./paths')
const { isDev } = require('./env')

const webpackConfig = {
  entry: {
    "content_script": paths.src('content_script/index.ts'),
    "background": paths.src('background/index.ts')
  },
  output: {
    path: paths.dist(),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new CheckerPlugin(),
    new CopyWebpackPlugin([
      { from: paths.base('static') }
    ]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    })
  ]
}

if (isDev) {
  console.log('Dev mode detected')

  const TSLintPlugin = require('tslint-webpack-plugin')

  // For production, linting is called on it's own.
  webpackConfig.plugins.push(new TSLintPlugin({
    files: [
      paths.src('**/*.ts'),
      paths.src('**/*.tsx'),
    ],
    config: paths.base('tslint.json'),
    project: paths.base('tsconfig.json'),
    typeCheck: true
  }))
}

module.exports = webpackConfig
