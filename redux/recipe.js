import axios from 'axios'
import { URL } from './url'

// clean up both reducers and "URIS"

// ACTION TYPES
const ADD_IMAGE_URL = 'ADD_IMAGE_URL'
const POST_RECIPE = 'POST_RECIPE'

// ACTION CREATORS
export const addImageUrl = (imageUrl) => ({
  type: ADD_IMAGE_URL,
  imageUrl,
})

const postedRecipe = (recipe) => ({
  type: POST_RECIPE,
  recipe,
})

// THUNK CREATORS
export const postRecipe = (recipeData) => async (dispatch) => {
  try {
    const { data: recipe } = await axios.post(`${URL}/api/recipes`, recipeData)
    dispatch(postedRecipe(recipe))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const initialState = {
  imageUrl: '',
  name: '',
  time: '',
  ingredients: [],
  directions: [],
}

// REDUCER
export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE_URL:
      // console.log('in reducer-->', action.imageUrl)
      return { ...state, imageUrl: action.imageUrl }
    case POST_RECIPE:
      return action.recipe
    default:
      return state
  }
}
