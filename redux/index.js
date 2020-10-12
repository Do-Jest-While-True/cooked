import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import recipes from './recipe'
import user from './user'

const appReducer = combineReducers({
  recipes,
  user,
})

const store = createStore(appReducer, applyMiddleware(thunkMiddleware))
export default store
export * from './user'
export * from './recipe'
