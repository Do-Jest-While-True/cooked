import axios from 'axios'
import { URL } from './serverUrl'

// ACTION TYPE
const GET_ALL_THREADS = 'GET_ALL_THREADS'

// ACTION CREATOR
const gotAllThreads = (threads) => ({
  type: 'GET_ALL_THREADS',
  threads,
})

// THUNK CREATOR
export const getAllThreads = () => async (dispatch) => {
  try {
    const { data: threads } = await axios.get(
      `${URL}/api/directMessage/threads`
    )
    dispatch(gotAllThreads(threads))
  } catch (error) {
    console.error(error)
  }
}

// Initial State
const initialState = []

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_THREADS:
      return action.threads
    default:
      return state
  }
}
