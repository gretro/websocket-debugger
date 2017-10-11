import { Action } from '../store/Action'

export const DELETE_TAB_ACTION = 'DELETE_TAB'

export function deleteTab(tabId: string): Action<string> {
  return {
    type: DELETE_TAB_ACTION,
    payload: tabId
  }
}
