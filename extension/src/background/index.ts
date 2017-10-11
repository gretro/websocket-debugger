import { createPortManager } from './portManager'
import { getStore } from './store/store'
import { deleteTab } from './actions/tabActions'

console.log('Background page loaded')

const store = getStore()

const portManager = createPortManager({
  onMessage: (msg) => {
    store.dispatch(msg)
  },
  onTabClosed: (tabId) => {
    store.dispatch(deleteTab(tabId))
  }
})

chrome.runtime.onSuspend.addListener(() => {
  portManager.dispose()
})
