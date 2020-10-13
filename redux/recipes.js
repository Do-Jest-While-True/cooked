import axios from 'axios'
import { URL } from './url'

// ACTION TYPES
const GOT_RECIPES = 'GOT_RECIPES'
const DELETE_RECIPE = 'DELETE_RECIPE'

// ACTION CREATORS
export const gotRecipes = (recipes) => ({
  type: GOT_RECIPES,
  recipes,
})

// needs to be refactored w/ thunks
export const deleteRecipe = (id) => ({
  type: DELETE_RECIPE,
  id,
})

// THUNK CREATORS
export const getRecipes = () => async (dispatch) => {
  try {
    const { data: recipes } = await axios.get(`${URL}/api/recipes`)
    dispatch(gotRecipes(recipes))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const initialState = []

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_RECIPES:
      // currently not recollecting existing state
      return action.recipes
    case DELETE_RECIPE:
      return state.filter((recipe) => recipe.id !== action.id)
    default:
      return state
  }
}
