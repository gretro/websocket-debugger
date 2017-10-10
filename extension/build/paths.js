const path = require('path')

function paths(basePath, ...parts) {
  return path.join(basePath, ...parts)
}

paths.base = paths(path.resolve(`${__dirname}/..`))
paths.src = paths.bind(null, paths.base, 'src')
paths.dist = paths.bind(null, paths.base, 'dist')

module.exports = paths
