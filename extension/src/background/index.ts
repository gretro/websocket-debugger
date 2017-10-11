import { createPortManager } from './portManager'

console.log('Background page loaded')

const portManager = createPortManager({
  onMessage: (msg) => {
    console.log('Background message received', msg)
  }
})

chrome.runtime.onSuspend.addListener(() => {
  portManager.dispose()
})
