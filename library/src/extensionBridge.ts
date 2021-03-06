import { protocolDomain, protocolUtils } from './protocol';

export function onSocketCreated(socketId: string, socket: WebSocket) {
  const msg: protocolDomain.Message<protocolDomain.SocketCreatedEvent> = {
    type: protocolDomain.SOCKET_CREATED_TYPE,
    payload: {
      socketId,
      status: protocolUtils.mapSocketStatus(socket.readyState),
      url: socket.url
    }
  };

  postMessage(msg);
}

export function onSocketStatusChanged(socketId: string, socket: WebSocket) {
  const msg: protocolDomain.Message<protocolDomain.SocketStatusUpdateEvent> = {
    type: protocolDomain.SOCKET_STATUS_UPDATE_TYPE,
    payload: {
      socketId,
      status: protocolUtils.mapSocketStatus(socket.readyState)
    }
  };

  postMessage(msg);
}

export function onMessageSent(socketId: string, data: any) {
  const msg: protocolDomain.Message<protocolDomain.MessageExchangeEvent> = {
    type: protocolDomain.MESSAGE_SENT_TYPE,
    payload: {
      socketId,
      data
    }
  };

  postMessage(msg);
}

export function onMessageReceived(socketId: string, data: any) {
  const msg: protocolDomain.Message<protocolDomain.MessageExchangeEvent> = {
    type: protocolDomain.MESSAGE_RECEIVED_TYPE,
    payload: {
      socketId,
      data
    }
  };

  postMessage(msg);
}

/**
 * Posts a message to the Content script.
 * @param message Message to send.
 */
function postMessage(message: protocolDomain.Message<any>): void {
  window.postMessage({
    ...message,
    error: false,
    meta: {
      version: protocolDomain.PROTOCOL_VERSION,
      family: 'WSInspector',
      timestamp: new Date().toISOString()
    }
  }, '*');
}
