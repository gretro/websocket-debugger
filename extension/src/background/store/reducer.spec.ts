import * as deepFreeze from 'deep-freeze'
import * as clone from 'clone'

import { initialState, reducer } from './reducer'
import { Action } from './Action'
import { State, TabState } from './State'
import { CREATE_TAB_ACTION } from '../actions/tabActions'

describe('Tab reducer', () => {
  it('When create tab action is dispatched, should create tab with ID', () => {
    // Arrange
    const tabId = 'TabOne'

    const state = clone(initialState)
    const action: Action<string> = {
      type: CREATE_TAB_ACTION,
      payload: tabId
    }

    deepFreeze(state)
    deepFreeze(action)

    // Act
    const newState = reducer(state, action)

    // Assert
    expect(newState).not.toBe(state)
    expect(newState.tabs).toHaveProperty(tabId)
    expect(newState.tabs[tabId].tabId).toBe(tabId)
    expect(newState.tabs[tabId].sockets).toEqual({ })
  })

  it('When creating tab, if tab already existed, should keep old tab', () => {
    // Arrange
    const tabId = 'TabOne'
    const tabState: TabState = {
      tabId,
      sockets: null
    }

    const state: State = {
      ...initialState,
      tabs: {
        ...initialState.tabs,
        [tabId]: tabState
      }
    }
    const action: Action<string> = {
      type: CREATE_TAB_ACTION,
      payload: tabId
    }

    deepFreeze(state)
    deepFreeze(action)

    // Act
    const newState = reducer(state as any, action)

    // Assert
    expect(newState).not.toBe(state)
    expect(newState.tabs).toHaveProperty(tabId)
    expect(newState.tabs[tabId]).toBe(tabState)
  })
})
