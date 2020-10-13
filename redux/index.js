import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import recipe from './recipe'
import recipes from './recipes'
import user from './user'

const appReducer = combineReducers({
  recipe,
  recipes,
  user,
})

const store = createStore(appReducer, applyMiddleware(thunkMiddleware))
export default store
export * from './user'
export * from './recipes'
export * from './recipe'
