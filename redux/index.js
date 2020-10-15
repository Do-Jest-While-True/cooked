import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import recipe from './recipe'

import allRecipes from './allRecipes'
import feedRecipes from './feedRecipes'
import auth from './auth'
import user from './user'
import singleRecipe from './singleRecipe'
import myRecipes from './myRecipes'

const appReducer = combineReducers({
  recipe,
  allRecipes,
  feedRecipes,
  auth,
  user,
  singleRecipe,
  myRecipes,
})

const store = createStore(appReducer, applyMiddleware(thunkMiddleware))
export default store
export * from './user'
export * from './allRecipes'
export * from './recipe'
export * from './feedRecipes'
export * from './singleRecipe'
export * from './auth'
export * from './myRecipes'
