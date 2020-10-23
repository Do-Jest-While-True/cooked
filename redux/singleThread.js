import axios from 'axios';
import { URL } from './serverUrl';

// ACTION TYPE
const GET_THREAD = 'GET_THREAD';
const POST_NEW_MESSAGE = 'POST_NEW_MESSAGE';

// ACTION CREATOR
const postedNewMessage = (msg) => ({
	type: POST_NEW_MESSAGE,
	msg
});

const gotThread = (thread) => ({
	type: GET_THREAD,
	thread
});

// THUNK CREATOR
export const postNewMessage = (newMessage) => async (dispatch) => {
	try {
		const { data: postedMessage } = await axios.post(`${URL}/api/directMessage/newMessage`, newMessage);
		dispatch(postedNewMessage(postedMessage));
	} catch (error) {
		console.error(error);
	}
};

export const getThread = (threadId) => async (dispatch) => {
	try {
		const { data: thread } = await axios.get(`${URL}/api/directMessage/singleThread/${threadId}`);
		dispatch(gotThread(thread));
	} catch (error) {
		console.error(error);
	}
};

// Initial State
const initialState = [];

// REDUCER
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_THREAD:
			return action.thread;
		case POST_NEW_MESSAGE:
			return [ ...state, action.msg ];
		default:
			return state;
	}
}
