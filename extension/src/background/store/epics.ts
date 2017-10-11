import { Epic, combineEpics } from 'redux-observable'
import { Action } from './Action'
import { State } from './State'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'

const debugEpic: Epic<Action<any>, State> = (action$, store) => (
  action$
    .filter(() => process.env.NODE_ENV === 'development')
    .do(action => {
      console.log(action.type, action, store.getState())
    })
    .filter(() => false)
)

export const epics = combineEpics(debugEpic)
