import axios from 'axios'
import { URL } from './url'

// ACTION TYPES
const GET_RECIPES = 'GET_RECIPES'
const ADD_RECIPE = 'ADD_RECIPE'
const DELETE_RECIPE = 'DELETE_RECIPE'
// const POST_RECIPE_IMAGE_URL = 'POST_RECIPE_IMAGE_URL'

// ACTION CREATORS
const gotRecipes = (recipes) => ({
  type: GET_RECIPES,
  recipes,
})

// needs to be refactored w/ thunks
export const addRecipe = (recipe) => ({
  type: ADD_RECIPE,
  recipe,
})

// needs to be refactored w/ thunks
export const deleteRecipe = (id) => ({
  type: DELETE_RECIPE,
  id,
})

// const postedImageUrl = (imageUrl) => ({
//   type: POST_RECIPE_IMAGE_URL,
//   imageUrl,
// })

// THUNK CREATORS
export const getRecipes = () => async (dispatch) => {
  try {
    const { data: recipes } = await axios.get(`${URL}/api/recipes`)
    dispatch(gotRecipes(recipes))
  } catch (error) {
    console.error(error)
  }
}

export const postImageUrl = (recipeId, imageUrl) => async (dispatch) => {
  try {
    // currently just posting -- not putting anything on state
    await axios.post(`${URL}/api/recipes/${recipeId}`, { imageUrl })
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const initialState = []

// REDUCER
export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      // currently not recollecting existing state
      return action.recipes
    case ADD_RECIPE:
      return [...state, action.recipe]
    case DELETE_RECIPE:
      return state.filter((recipe) => recipe.id !== action.id)
    // case POST_RECIPE_IMAGE_URL:
    //   return state
    default:
      return state
  }
}
