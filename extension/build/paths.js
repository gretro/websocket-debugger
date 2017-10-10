const path = require('path')

function paths(...parts) {
  return path.join(...parts)
}

paths.base = paths.bind(null, path.resolve(`${__dirname}/..`))
paths.src = paths.bind(null, paths.base(), 'src')
paths.dist = paths.bind(null, paths.base(), 'dist')

module.exports = paths
