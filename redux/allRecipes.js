import axios from 'axios'
import { URL } from './serverUrl'

// ACTION TYPES
const GOT_ALL_RECIPES = 'GOT_ALL_RECIPES'
const DELETE_RECIPE = 'DELETE_RECIPE'

// ACTION CREATORS
export const gotAllRecipes = (recipes) => ({
  type: GOT_ALL_RECIPES,
  recipes,
})

// needs to be refactored w/ thunks
export const deleteRecipe = (id) => ({
  type: DELETE_RECIPE,
  id,
})

// THUNK CREATORS
export const getAllRecipes = () => async (dispatch) => {
  try {
    const { data: recipes } = await axios.get(`${URL}/api/recipes/all`)
    dispatch(gotAllRecipes(recipes))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const initialState = []

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_RECIPES:
      // currently not recollecting existing state
      return action.recipes
    case DELETE_RECIPE:
      return state.filter((recipe) => recipe.id !== action.id)
    default:
      return state
  }
}
