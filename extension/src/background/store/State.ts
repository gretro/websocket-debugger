export interface State {
  tabs: TabsMapObject
}

interface MapObject<T> {
  [key: string]: T
}

export type TabsMapObject = MapObject<TabState>
export type SocketsMapObject = MapObject<SocketState>

export interface TabState {
  tabId: string
  sockets: SocketsMapObject
}

export interface SocketState {
  socketId: string
  url: string
  status: string
  lastUpdated: Date
  messages: SocketMessage[]
}

export interface SocketMessage {
  uniqueId: string
  timestamp: Date
  content: string
  direction: 'SENT' | 'RECEIVED'
}
