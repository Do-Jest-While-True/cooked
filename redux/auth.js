import axios from 'axios'
import { URL } from './serverUrl'

/**
 * ACTION TYPES
 */
const GET_AUTH = 'GET_AUTH'
const REMOVE_AUTH = 'REMOVE_AUTH'
const SET_LOGGING_IN = 'SET_LOGGING_IN'
// const SET_UNIQUE_EMAIL_MSG = 'SET_UNIQUE_EMAIL_MSG';

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_AUTH, user })
const removeUser = () => ({ type: REMOVE_AUTH })
const setLoggingIn = (bool) => ({ type: SET_LOGGING_IN, bool })
// const setUniqueEmailMsg = (msg) => ({ type: SET_UNIQUE_EMAIL_MSG, msg });

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
    dispatch(setLoggingIn(true))
    res = await axios.post(`${URL}/auth/${method}`, payload)
    // if (res.data === 'Email already registered!') dispatch(setUniqueEmailMsg(res.data));
    dispatch(setLoggingIn(false))
  } catch (authError) {
    // console.log('authError in thunk--->', authError);
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
 * INITIAL STATE
 */
const defaultUser = {
  isLoggingIn: false,
  // uniqueEmailMsg: ''
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
    case SET_LOGGING_IN:
      return { ...defaultUser, isLoggingIn: action.bool }
    // case SET_UNIQUE_EMAIL_MSG:
    // return { ...defaultUser, uniqueEmailMsg: action.msg };
    default:
      return state
  }
}
