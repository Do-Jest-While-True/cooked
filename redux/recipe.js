import axios from 'axios'
import { URL } from './serverUrl'

// this entire reducer should only be used for managing state on RecipePostForm for a single recipe object. When the form is submitted, the thunk creator postRecipe is used to actually post that single recipe object to the DB.

// all other recipe needs should be handled in recipes.js

// all managing

// ACTION TYPES
const ADD_IMAGE_URL = 'ADD_IMAGE_URL'
const REMOVE_IMAGE_URL = 'REMOVE_IMAGE_URL'
const POST_RECIPE = 'POST_RECIPE'
const IS_UPLOADING = 'IS_UPLOADING'

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

const isUploading = (bool) => ({
  type: IS_UPLOADING,
  isUploading: bool,
})

// THUNK CREATORS
// post data entered in RecipePostForm into the DB and put it on state:
export const postRecipe = (recipeData) => async (dispatch) => {
  try {
    dispatch(isUploading(true))
    const { data: recipe } = await axios.post(`${URL}/api/recipes`, recipeData)
    dispatch(postedRecipe(recipe))
    dispatch(isUploading(false))
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
  isUploading: false,
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
    case IS_UPLOADING:
      return { ...state, isUploading: action.bool }
    default:
      return state
  }
}
