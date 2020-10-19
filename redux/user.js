import axios from 'axios'
import { URL } from './serverUrl'

/**
 * ACTION TYPES
 */
const GET_ME = 'GET_ME'
const GET_USER = 'GET_USER'
const GET_USERS = 'GET_USER'

/**
 * ACTION CREATORS
 */
const gotMe = (me) => ({ type: GET_ME, me })
const getUser = (user) => ({ type: GET_USER, user })
const getUsers = (users) => ({ type: GET_USERS, users })

/**
 * THUNK CREATORS
 */

export const getMe = (userId) => async (dispatch) => {
  try {
    const { data: me } = await axios.get(`${URL}/api/users/${userId}`)
    dispatch(gotMe(me))
  } catch (error) {
    console.error(error)
  }
}

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

export const followUser = (userToFollowId) => async () => {
  try {
    await axios.post(`${URL}/api/users/follow/${userToFollowId}`)
  } catch (error) {
    console.error(error)
  }
}

/**
 * INITIAL STATE
 */
const defaultUser = {
  me: {},
  user: {},
  users: [],
}

/**
 * REDUCER
 */

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_ME:
      return { ...state, me: action.me }
    case GET_USER:
      return { ...state, user: action.user }
    case GET_USERS:
      return { ...state, users: action.users }
    default:
      return state
  }
}
