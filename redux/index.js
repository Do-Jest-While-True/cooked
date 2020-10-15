import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import recipe from './recipe'
import allRecipes from './allRecipes'
import feedRecipes from './feedRecipes'
import user from './user'
import singleRecipe from './singleRecipe'

const appReducer = combineReducers({
  recipe,
  allRecipes,
  feedRecipes,
  user,
  singleRecipe,
})

const store = createStore(appReducer, applyMiddleware(thunkMiddleware))
export default store
export * from './user'
export * from './allRecipes'
export * from './recipe'
export * from './feedRecipes'
export * from './singleRecipe'
