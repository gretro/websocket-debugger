import { Action } from '../store/Action'

export const CREATE_TAB_ACTION = 'CREATE_TAB'
export const DELETE_TAB_ACTION = 'DELETE_TAB'

export function createTab(tabId: string): Action<string> {
  return {
    type: CREATE_TAB_ACTION,
    payload: tabId
  }
}

export function deleteTab(tabId: string): Action<string> {
  return {
    type: DELETE_TAB_ACTION,
    payload: tabId
  }
}
