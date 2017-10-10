const { CheckerPlugin } = require('awesome-typescript-loader')
const paths = require('./paths')
const { isDev } = require('./env')

const webpackConfig = {
  entry: {
    "content_script": paths.src('content_script/index.ts')
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
    new CheckerPlugin()
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