import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { recipesReducer } from './recipes'

// INITIAL STATE:
// {
//	recipes: []
// }

const appReducer = combineReducers({
  recipes: recipesReducer,
})

export const store = createStore(appReducer, applyMiddleware(thunkMiddleware))
