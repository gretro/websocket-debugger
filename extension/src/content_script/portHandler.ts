import { CONTENT_SCRIPT_PORT_NAME } from '../common/port'

let port: chrome.runtime.Port = null

export function getPort (): chrome.runtime.Port {
  if (!port) {
    port = chrome.runtime.connect({
      name: CONTENT_SCRIPT_PORT_NAME
    })

    port.onDisconnect.addListener(() => {
      port = null
      console.log('Port disconnected')
    })
  }

  return port
}
