import axios from 'axios'
import { URL } from './serverUrl'

// ACTION TYPES
const GET_LIKE_OBJECT = 'GET_LIKE_OBJECT'
const ADD_LIKE_OBJECT = 'ADD_LIKE_OBJECT'
const REMOVE_LIKE_OBJECT = 'REMOVE_LIKE_OBJECT'

// ACTION CREATORS
export const gotLikeObject = (likeObjects) => ({
  type: GET_LIKE_OBJECT,
  likeObjects,
})

export const addedLikeObject = (likeObject) => ({
  type: ADD_LIKE_OBJECT,
  likeObject,
})

export const removedLikeObject = (recipeId) => ({
  type: REMOVE_LIKE_OBJECT,
  recipeId,
})

// THUNK CREATORS
export const getLikeObject = () => async (dispatch) => {
  try {
    const { data: likeObject } = await axios.get(`${URL}/api/recipes/like/all`)
    dispatch(gotLikeObject(likeObject))
  } catch (error) {
    console.error(error)
  }
}

export const addLikeObject = (recipeId) => async (dispatch) => {
  try {
    const { data: likeObject } = await axios.put(
      `${URL}/api/recipes/like/${recipeId}`
    )
    dispatch(addedLikeObject(likeObject))
  } catch (error) {
    console.error(error)
  }
}

export const removeLikeObject = (recipeId) => async (dispatch) => {
  try {
    const { data: likeObject } = await axios.delete(
      `${URL}/api/recipes/like/${recipeId}`
    )
    dispatch(removedLikeObject(recipeId))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const initialState = []

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIKE_OBJECT:
      return action.likeObjects
    case ADD_LIKE_OBJECT:
      return [...state, action.likeObject]
    case REMOVE_LIKE_OBJECT:
      let newerState = state.filter(
        (singleLikeObject) => singleLikeObject.recipeId !== action.recipeId
      )
      console.log(newerState)
      return newerState
    default:
      return state
  }
}
