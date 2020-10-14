import axios from 'axios'
import { URL } from './serverUrl'

/**
 * ACTION TYPES
 */
const GET_AUTH = 'GET_AUTH'
const REMOVE_AUTH = 'REMOVE_AUTH'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_AUTH, user })
const removeUser = () => ({ type: REMOVE_AUTH })

/**
 * THUNK CREATORS
 */
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
    case GET_AUTH:
      return action.user
    case REMOVE_AUTH:
      return defaultUser
    default:
      return state
  }
}
