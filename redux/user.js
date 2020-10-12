// import axios from 'axios'
// import history from '../history'
// import {URL} from './url'

// /**
//  * ACTION TYPES
//  */
// const GET_USER = 'GET_USER'
// const REMOVE_USER = 'REMOVE_USER'

// /**
//  * INITIAL STATE
//  */
// const defaultUser = {}

// /**
//  * ACTION CREATORS
//  */
// const getUser = user => ({type: GET_USER, user})
// const removeUser = () => ({type: REMOVE_USER})

// /**
//  * THUNK CREATORS
//  */
// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get(`${URL}/auth/me`)
//     dispatch(getUser(res.data || defaultUser))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const auth = (
//   firstName,
//   lastName,
//   email,
//   password,
//   method
// ) => async dispatch => {
//   let res
//   try {
//     res = await axios.post(`${URL}/auth/${method}`, {
//       email,
//       firstName,
//       lastName,
//       password
//     })
//   } catch (authError) {
//     return dispatch(getUser({error: authError}))
//   }

//   try {
//     dispatch(getUser(res.data))

//     createBrowserHistory().push()
//     history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     await axios.post(`${URL}/auth/logout`)
//     dispatch(removeUser())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }

// /**
//  * REDUCER
//  */
// export default function(state = defaultUser, action) {
//   switch (action.type) {
//     case GET_USER:
//       return action.user
//     case REMOVE_USER:
//       return defaultUser
//     default:
//       return state
//   }
// }
