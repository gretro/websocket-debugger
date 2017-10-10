const { FuseBox, WebIndexPlugin, RawPlugin } = require('fuse-box')
const fs = require('fs')

const fuse = FuseBox.init({
  homeDir: '',
  output: 'dist/$name.js',
  sourceMaps: true,
  tsConfig: 'tsconfig.json'
})

fuse.dev({
    port: 8003
})

fuse.bundle('content_script')
  .instructions('>src/content_script/index.ts')
  .watch('src/content_script/')

fuse.run()

fs.copyFile('static/manifest.json', 'dist/manifest.json', err => {
  if (err) { throw err }
  console.log('Manifest file copied')
})