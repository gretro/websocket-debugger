import { Reducer, ReducersMapObject } from 'redux'
import { State, TabState } from './State'
import { Action } from './Action'
import { CREATE_TAB_ACTION } from '../actions/tabActions'

export const initialState: State = {
  tabs: { }
}

const HANDLERS: ReducersMapObject = {
  [CREATE_TAB_ACTION]: handleCreateTab
}

export const reducer: Reducer<State> = (state = initialState, action: Action) => {
  const handler = HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

function handleCreateTab(state: State, action: Action<string>) {
  const newTab: TabState = {
    tabId: action.payload,
    sockets: { }
  }

  return {
    ...state,
    tabs: {
      [action.payload]: newTab,
      ...state.tabs
    }
  }
}
