import axios from 'axios'
import { URL } from './serverUrl'

// ACTION TYPES
const GOT_FEED_RECIPES = 'GOT_FEED_RECIPES'

// ACTION CREATORS
export const gotFeedRecipes = (feedRecipes) => ({
  type: GOT_FEED_RECIPES,
  feedRecipes,
})

// THUNK CREATORS
export const getFeedRecipes = () => async (dispatch) => {
  try {
    const { data: recipes } = await axios.get(`${URL}/api/recipes/feed`)
    dispatch(gotFeedRecipes(recipes))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const initialState = []

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_FEED_RECIPES:
      return action.feedRecipes
    default:
      return state
  }
}
