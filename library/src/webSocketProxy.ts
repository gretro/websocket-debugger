import * as uuidv4 from 'uuid/v4';
import { onSocketCreate, onSocketStatusChange, onMessageSend, onMessageReceived } from './extensionBridge';

interface SocketCallbacks {
  [key: string]: any;
  onopen?: (this: WebSocket, ev: Event) => any;
  onmessage?: (this: WebSocket, ev: MessageEvent) => any;
  onclose?: (this: WebSocket, ev: CloseEvent) => any;
  onerror?: (this: WebSocket, ev: Event) => any;
}

interface ProxyProps {
  [key: string]: any;
  send: (data: any) => any;
}

export function getWSProxy(socket: WebSocket): WebSocket {
  const socketId = uuidv4();

  const socketCallbacks: SocketCallbacks = {
    onopen: socket.onopen,
    onmessage: socket.onmessage,
    onclose: socket.onclose,
    onerror: socket.onerror
  };

  overrideSocketCallbacks(socket, socketId, socketCallbacks);

  const proxyProps: ProxyProps = {
    send: function proxySend(data: any) {
      onMessageSend(socketId, data);
      this.send(data);
    }
  };

  const socketProxy: WebSocket = new Proxy(socket, {
    get: function(target: any, property) {
      if (property in socketCallbacks) {
        return socketCallbacks[property];
      }

      const value = property in proxyProps 
        ? proxyProps[property] 
        : target[property];
      
      if (isFunction(value)) {
        return value.bind(target);
      }

      return value;
    },
    set: function(target, property, value) {
      if (property in socketCallbacks) {
        socketCallbacks[property] = value;
      } else {
        target[property] = value;
      }

      return true;
    }
  });

  onSocketCreate(socketId, socketProxy);
  return socketProxy;
}

function isFunction(obj: any) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

function overrideSocketCallbacks(socket: WebSocket, socketId: string, callbacks: SocketCallbacks): void {
  socket.onopen = function proxyOnOpen(evt: Event) {
    onSocketStatusChange(socketId, socket);

    if (callbacks.onopen) {
      callbacks.onopen.bind(socket)(evt);
    }
  }

  socket.onmessage = function proxyOnMessage(evt: MessageEvent) {
    onMessageReceived(socketId, evt.data);

    if (callbacks.onmessage) {
      callbacks.onmessage.bind(socket)(evt);
    }
  }

  socket.onclose = function proxyOnClose(evt: CloseEvent) {
    onSocketStatusChange(socketId, socket);

    if (callbacks.onclose) {
      callbacks.onclose.bind(socket)(evt);
    }
  }

  socket.onerror = function proxyOnError(evt: Event) {
    onSocketStatusChange(socketId, socket);

    if (callbacks.onerror) {
      callbacks.onerror.bind(socket)(evt);
    }
  }
}
