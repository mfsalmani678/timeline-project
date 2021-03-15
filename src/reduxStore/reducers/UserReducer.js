import * as userActionTypes from 'reduxStore/actionTypes/UserActionTypes.js'

export default function userState (state = {}, action) {
	
	switch(action.type) {
		case userActionTypes.USER_ADDED:
		return {
			user: action.payload	
		}		
		default:
			return state;
	}

}
