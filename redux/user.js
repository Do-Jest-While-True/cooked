import axios from 'axios'
import { me } from './auth'
import { URL } from './serverUrl'

/**
 * ACTION TYPES
 */
const GET_ME = 'GET_ME'
const GET_USER = 'GET_USER'
const GET_USERS = 'GET_USER'
const ADD_PROFILE_IMAGE_URL = 'ADD_PROFILE_IMAGE_URL'
// const SET_ERROR_MSG = 'SET_ERROR_MSG';

/**
 * ACTION CREATORS
 */
const gotMe = (me) => ({ type: GET_ME, me })
const getUser = (user) => ({ type: GET_USER, user })
const getUsers = (users) => ({ type: GET_USERS, users })
const addedProfileImageUrl = (profileImageUrl) => ({
  type: ADD_PROFILE_IMAGE_URL,
  profileImageUrl,
})
// const setErrorMsg = (msg) => ({ type: SET_ERROR_MSG, msg });

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

export const addProfileImageUrl = (profileImageUrl) => async (dispatch) => {
  try {
    await axios.put(`${URL}/api/users/profileImage`, { profileImageUrl })
    dispatch(addedProfileImageUrl(profileImageUrl))
  } catch (error) {
    console.error(error)
  }
}

export const updateUsername = (newUsername) => async () => {
  try {
    const res = await axios.put(`${URL}/api/users/username`, { newUsername })
    // console.log('res in username thunk-->', res.data);
    // if (res.data === 'Username already taken!') {
    // 	console.log('conditional hit');
    // 	setErrorMsg('testing');
    // }
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

export const unfollowUser = (unfollowId) => async () => {
  try {
    await axios.delete(`${URL}/api/users/follow/${unfollowId}`)
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
  // errorMsg: ''
}

/**
 * REDUCER
 */

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_ME:
      return { ...state, me: action.me }
    case ADD_PROFILE_IMAGE_URL:
      return {
        ...state,
        me: {
          ...state.me,
          user: { ...state.me.user, profileImageUrl: action.profileImageUrl },
        },
      }
    case GET_USER:
      return { ...state, user: action.user }
    case GET_USERS:
      return { ...state, users: action.users }
    // case SET_ERROR_MSG:
    // 	console.log('reducer hit');
    // 	return { ...state, errorMsg: action.msg };
    default:
      return state
  }
}
