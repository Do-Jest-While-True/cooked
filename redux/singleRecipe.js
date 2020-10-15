import axios from 'axios'
import { URL } from './serverUrl'

// ACTION TYPES
const GET_SINGLE_RECIPE = 'GET_RECIPE_FEED'

// ACTION CREATORS
export const gotSingleRecipe = (singleRecipe) => ({
  type: GET_SINGLE_RECIPE,
  singleRecipe,
})

// THUNK CREATORS
export const getSingleRecipe = (recipeId) => async (dispatch) => {
  try {
    const { data: singleRecipe } = await axios.get(
      `${URL}/api/recipes/singlerecipe/${recipeId}`
    )
    dispatch(gotSingleRecipe(singleRecipe))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const initialState = {}

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_RECIPE:
      return action.singleRecipe
    default:
      return state
  }
}
