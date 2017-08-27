const { FuseBox, WebIndexPlugin } = require('fuse-box');
const WebSocket = require('ws');

const fuse = FuseBox.init({
  homeDir: '',
  output: 'tmp/$name.js',
  sourceMaps: true,
  plugins: [
    WebIndexPlugin({
      template: 'live/index.html'
    })
  ]
});

fuse.dev({
  port: 8001
});

fuse.bundle('live')
  .target('browser')
  .instructions('>live/index.ts')
  .watch();

fuse.run();

const wsServer = new WebSocket.Server({ port: 8002 });
wsServer.on('connection', (socket) => {
  console.log('<ws>: Connection established');
  socket.send('Welcome on the echo WS server');

  socket.on('message', msg => {
    console.log(`<ws>: Received: "${msg}"`);
    socket.send(msg.toUpperCase());
  });

  socket.on('close', () => {
    console.log('<ws>: Connection closed');
  });
});

console.log('Websocket server listening at "ws://localhost:8002"');