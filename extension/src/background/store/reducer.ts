import { Reducer, ReducersMapObject } from 'redux'
import { State } from './State'
import { Action } from './Action'

const initialState: State = {
  tabs: { }
}

const HANDLERS: ReducersMapObject = {

}

export const reducer: Reducer<State> = (state = initialState, action: Action) => {
  const handler = HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
