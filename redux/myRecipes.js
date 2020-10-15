import axios from 'axios'
import { URL } from './serverUrl'

// ACTION TYPES
const GET_MY_RECIPES = 'GET_MY_RECIPES'

// ACTION CREATORS
export const gotMyRecipes = (myRecipes) => ({
  type: GET_MY_RECIPES,
  myRecipes,
})

// THUNK CREATORS
export const getMyRecipes = (userId) => async (dispatch) => {
  try {
    const { data: recipes } = await axios.get(`${URL}/api/recipes/${userId}`)
    dispatch(gotMyRecipes(recipes))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const initialState = []

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MY_RECIPES:
      return action.myRecipes
    default:
      return state
  }
}
