import axios from 'axios'
import { URL } from './serverUrl'

// ACTION TYPE
const GET_THREAD_MESSAGES = 'GET_THREAD_MESSAGES'
const POST_NEW_MESSAGE = 'POST_NEW_MESSAGE'

// ACTION CREATOR
const postedNewMessage = (msg) => ({
  type: POST_NEW_MESSAGE,
  msg,
})

const gotThreadMessages = (threadMessages) => ({
  type: GET_THREAD_MESSAGES,
  threadMessages,
})

// THUNK CREATOR
export const postNewMessage = (newMessage) => async (dispatch) => {
  try {
    const { data: postedMessage } = await axios.post(
      `${URL}/api/directMessage/newMessage`,
      newMessage
    )
    dispatch(postedNewMessage(postedMessage))
  } catch (error) {
    console.error(error)
  }
}

export const getThreadMessages = (threadId) => async (dispatch) => {
  try {
    const { data: threadMsgs } = await axios.get(
      `${URL}/api/directMessage/singleThread/${threadId}`
    )
    dispatch(gotThreadMessages(threadMsgs))
  } catch (error) {
    console.error(error)
  }
}

// Initial State
const initialState = []

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_THREAD_MESSAGES:
      return action.threadMessages
    case POST_NEW_MESSAGE:
      return [...state, action.msg]
    default:
      return state
  }
}
