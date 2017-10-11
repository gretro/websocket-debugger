export const PROTOCOL_VERSION = "1.0.0";

export interface Message<T> {
  type: string;
  payload?: T;
  version?: string;
  timestamp?: Date;
  meta?: any;
}

export enum SocketStatus {
  connecting = 'CONNECTING',
  open = 'OPEN',
  closing = 'CLOSING',
  closed = 'CLOSED'
}

export const SOCKET_CREATED_TYPE = `SOCKET_CREATED`;
export interface SocketCreatedEvent {
  socketId: string;
  status: SocketStatus;
  url: string;
}

export const SOCKET_STATUS_UPDATE_TYPE = `SOCKET_STATUS_UPDATE`;
export interface SocketStatusUpdateEvent {
  socketId: string;
  status: SocketStatus;
}

export const MESSAGE_SENT_TYPE = `MESSAGE_SENT`;
export const MESSAGE_RECEIVED_TYPE = `MESSAGE_RECEIVED`;
export interface MessageExchangeEvent {
  socketId: string;
  data: any;
}

