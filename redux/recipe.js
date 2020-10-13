import axios from 'axios'
import { URL } from './url'

// ACTION TYPES
const ADD_IMAGE_URL = 'ADD_IMAGE_URL'
const REMOVE_IMAGE_URL = 'REMOVE_IMAGE_URL'
const POST_RECIPE = 'POST_RECIPE'

// ACTION CREATORS
export const addImageUrl = (imageUrl) => ({
  type: ADD_IMAGE_URL,
  imageUrl,
})

export const removeImageUrl = () => ({
  type: REMOVE_IMAGE_URL,
})

const postedRecipe = (recipe) => ({
  type: POST_RECIPE,
  recipe,
})

// THUNK CREATORS
// post data entered in RecipePostForm into the DB and put it on state:
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
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_IMAGE_URL:
      return { ...state, imageUrl: action.imageUrl }
    case REMOVE_IMAGE_URL:
      return { ...state, imageUrl: '' }
    case POST_RECIPE:
      return { ...state, ...action.recipe }
    default:
      return state
  }
}
