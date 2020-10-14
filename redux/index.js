import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import recipe from './recipe'
import recipes from './recipes'
import auth from './auth'
import user from './user'

const appReducer = combineReducers({
  recipe,
  recipes,
  auth,
  user,
})

const store = createStore(appReducer, applyMiddleware(thunkMiddleware))
export default store
export * from './auth'
export * from './recipes'
export * from './recipe'
export * from './user'
