import axios from 'axios'
import { URL } from './serverUrl'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GET_USERS = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user })
const getUsers = (users) => ({ type: GET_USERS, users })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */

// USER ROUTES
export const gotUser = (userId) => async (dispatch) => {
  try {
    const { res: user } = await axios.get(`${URL}/api/users/${userId}`)
    dispatch(getUser(user))
  } catch (error) {
    console.error(error)
  }
}

export const gotUsers = () => async (dispatch) => {
  try {
    const { res: users } = await axios.get(`${URL}/api/users`)
    dispatch(getUsers(users))
  } catch (err) {
    console.error(err)
  }
}

// AUTH ROUTES
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/auth/me`)
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (payload, method) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`${URL}/auth/${method}`, payload)
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post(`${URL}/auth/logout`)
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_USERS:
      return action.users
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
