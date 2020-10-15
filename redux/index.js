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
  auth,
  user,
  allRecipes,
  feedRecipes,
  singleRecipe,
  myRecipes,
  recipe,

})

const store = createStore(appReducer, applyMiddleware(thunkMiddleware))
export default store
export * from './auth'
export * from './user'
export * from './allRecipes'
export * from './feedRecipes'
export * from './singleRecipe'
export * from './myRecipes'
export * from './recipe'
