const { CheckerPlugin } = require('awesome-typescript-loader')
const paths = require('./paths')

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

module.exports = webpackConfig
