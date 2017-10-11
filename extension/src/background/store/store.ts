import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { reducer } from './reducer'
import { epics } from './epics'

export function getStore() {
  const epicMiddleware = createEpicMiddleware(epics)

  const store = createStore(reducer, applyMiddleware(epicMiddleware))
  return store
}
