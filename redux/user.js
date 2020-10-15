import axios from 'axios'
import { URL } from './serverUrl'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_USERS = 'GET_USER'

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user })
const getUsers = (users) => ({ type: GET_USERS, users })

/**
 * THUNK CREATORS
 */

// USER ROUTES
export const gotUser = (userId) => async (dispatch) => {
  try {
    const { data: user } = await axios.get(`${URL}/api/users/${userId}`)
    dispatch(getUser(user))
  } catch (error) {
    console.error(error)
  }
}

export const gotUsers = () => async (dispatch) => {
  try {
    const { data: users } = await axios.get(`${URL}/api/users`)
    dispatch(getUsers(users))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  users: [],
}

/**
 * REDUCER
 */

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user }
    case GET_USERS:
      return { ...state, users: action.users }
    default:
      return state
  }
}
