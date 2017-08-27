import { getWSProxy } from '../src/index';

const socket = getWSProxy(new WebSocket('ws://localhost:8002'));

let interval = null;
socket.onopen = function() {
  console.log(`[${(new Date()).toISOString()}]: Websocket openened to "${socket.url}"`);

  interval = setInterval(() => {
    const msg = 'Hello, world!';
    console.log(`[${(new Date()).toISOString()}]: Sending message: "${msg}"`);
    socket.send(msg);
  }, 2000);
};

socket.onclose = function() {
  console.log(`[${(new Date()).toISOString()}]: Websocket to "${socket.url} closed"`);
  
  if (interval) {
    clearInterval(interval);
  }
}

socket.onmessage = (e) => {
  console.log(`[${(new Date()).toISOString()}]: Message received: "${e.data}"`);
}