import { createPortManager } from './portManager'
import { getStore } from './store/store'
import { createTab, deleteTab } from './actions/tabActions'

console.log('Background page loaded')

const store = getStore()

const portManager = createPortManager({
  onMessage: msg => {
    store.dispatch(msg)
  },
  onTabCreated: tabId => {
    store.dispatch(createTab(tabId))
  },
  onTabClosed: tabId => {
    store.dispatch(deleteTab(tabId))
  },
})

chrome.runtime.onSuspend.addListener(() => {
  portManager.dispose()
})
