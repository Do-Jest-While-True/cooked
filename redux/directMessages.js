import axios from 'axios'
import { URL } from './serverUrl'

// ACTION TYPE
const GET_ALL_THREADS = 'GET_ALL_THREADS'
const POST_NEW_THREAD = 'POST_NEW_THREAD'

// ACTION CREATOR
const gotAllThreads = (threads) => ({
  type: GET_ALL_THREADS,
  threads,
})

const postedNewThread = (thread) => ({
  type: POST_NEW_THREAD,
  thread,
})

// THUNK CREATOR
export const getAllThreads = () => async (dispatch) => {
  try {
    const { data: threads } = await axios.get(
      `${URL}/api/directMessage/threads`
    )

    // const sortedThreads = threads.sort((a, b) => {
    // 	if (a.messages.length && b.messages.lengths) {
    // 		a.messages[messages.length - 1].updatedAt - b.messages[messages.length - 1].updatedAt;
    // 	}
    // });
    // console.log('--------------------------------------');
    // console.log(sortedThreads);
    // console.log('--------------------------------------');

    dispatch(gotAllThreads(threads))
  } catch (error) {
    console.error(error)
  }
}

export const postNewThread = (myId, username) => async (dispatch) => {
  try {
    const { data: newThread } = await axios.post(
      `${URL}/api/directMessage/newThread`,
      {
        myId,
        username,
      }
    )
    dispatch(postedNewThread(newThread))
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
    case POST_NEW_THREAD:
      return [action.thread, ...state]
    default:
      return state
  }
}
