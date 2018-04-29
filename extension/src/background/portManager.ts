import { CONTENT_SCRIPT_PORT_NAME } from '../common/port'

export type PortListenerState = 'CLOSED' | 'OPENED'

interface PortManager {
  pushUpdate: (tabId: string, update: any) => void // TODO: Define how updates are pushed.
  dispose: () => void
}

interface State {
  csPorts: PortMap
  state: PortListenerState
}

interface PortMap {
  [key: string]: chrome.runtime.Port
}

// TODO: Get type for messages.
type OnMessageCallback = (message: any) => void

interface CreatePortManagerOptions {
  onMessage: OnMessageCallback
  onTabCreated: (tabId: string) => void
  onTabClosed: (tabId: string) => void
}

export function createPortManager(options: CreatePortManagerOptions): PortManager {
  const state: State = {
    csPorts: {},
    state: 'CLOSED',
  }

  listen(state, options)
  return {
    pushUpdate: (tabId, update) => console.log('pushing update', update),
    dispose: close.bind(null, state),
  }
}

function listen(state: State, options: CreatePortManagerOptions): void {
  chrome.runtime.onConnect.addListener(port => {
    if (port.name === CONTENT_SCRIPT_PORT_NAME) {
      addContentScriptPort(port, state, options)
    }
  })

  state.state = 'OPENED'
}

function addContentScriptPort(port: chrome.runtime.Port, state: State, options: CreatePortManagerOptions) {
  const tabId = port.sender.tab.id.toString()
  state.csPorts[tabId] = port
  options.onTabCreated(tabId)

  port.onDisconnect.addListener(() => {
    state.csPorts[tabId] = void 0

    options.onTabClosed(tabId)
  })

  port.onMessage.addListener((msg: any) => {
    options.onMessage({
      ...msg,
      meta: {
        ...msg.meta,
        tabId,
      },
    })
  })
}

function close(state: State): void {
  Object.keys(state.csPorts).forEach(key => {
    const port = state.csPorts[key]

    if (port) {
      port.disconnect()
    }
  })

  state.state = 'CLOSED'
}
