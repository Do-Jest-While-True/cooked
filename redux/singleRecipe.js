import axios from 'axios'
import { URL } from './serverUrl'

// ACTION TYPES
const GET_SINGLE_RECIPE = 'GET_RECIPE_FEED'
const ADD_COMMENT = 'ADD_COMMENT'
const REMOVE_COMMENT = 'REMOVE_COMMENT'
const EDIT_COMMENT = 'EDIT_COMMENT'

// ACTION CREATORS
export const gotSingleRecipe = (singleRecipe) => ({
  type: GET_SINGLE_RECIPE,
  singleRecipe,
})

export const addedComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
})

export const removedComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
})

export const editedComment = (comment) => ({
  type: EDIT_COMMENT,
  comment,
})

// THUNK CREATORS
export const getSingleRecipe = (recipeId) => async (dispatch) => {
  try {
    const { data: singleRecipe } = await axios.get(
      `${URL}/api/recipes/singlerecipe/${recipeId}`
    )
    const recipeObj = {
      ...singleRecipe.recipe,
      comments: singleRecipe.comments,
    }
    dispatch(gotSingleRecipe(recipeObj))
  } catch (error) {
    console.error(error)
  }
}

export const addComment = (recipeId, comment) => async (dispatch) => {
  try {
    const { data: returnedComment } = await axios.post(
      `${URL}/api/comments/${recipeId}`,
      comment
    )
    dispatch(addedComment(returnedComment))
  } catch (error) {
    console.error(error)
  }
}

export const removeComment = (commentId) => async (dispatch) => {
  try {
    await axios.delete(`${URL}/api/comments/${commentId}`)
    dispatch(removedComment(commentId))
  } catch (error) {
    console.error(error)
  }
}

export const editComment = (commentId, comment) => async (dispatch) => {
  try {
    const { data: updatedComment } = await axios.put(
      `${URL}/api/comments/${commentId}`,
      comment
    )
    dispatch(editedComment(updatedComment))
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
    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, action.comment] }
    case REMOVE_COMMENT:
      let newerComments = state.comments.filter(
        (comment) => comment.id !== action.commentId
      )
      return { ...state, comments: newerComments }
    case EDIT_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments.map((comment) => {
            if (comment.id === action.comment.id) {
              return action.comment
            } else {
              return comment
            }
          }),
        ],
      }
    default:
      return state
  }
}
