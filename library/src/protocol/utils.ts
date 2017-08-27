import { SocketStatus } from './domain';

export function mapSocketStatus(socketReadyState: number): SocketStatus {
  switch(socketReadyState) {
    case WebSocket.CONNECTING:
      return SocketStatus.connecting;
    case WebSocket.OPEN:
      return SocketStatus.open;
    case WebSocket.CLOSING:
      return SocketStatus.closing;
    case WebSocket.CLOSED:
      return SocketStatus.closed;
    default:
      throw new Error('Unable to map Socket Ready State to SocketStatus');
  }
}
