import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { recipesReducer } from './recipes'
import { recipeReducer } from './recipe'

// INITIAL STATE:
// {
//	recipes: []
// }

const appReducer = combineReducers({
  recipes: recipesReducer,
  recipe: recipeReducer,
})

export const store = createStore(appReducer, applyMiddleware(thunkMiddleware))
