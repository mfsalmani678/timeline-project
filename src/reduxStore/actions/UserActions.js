import * as userActionType from 'reduxStore/actionTypes/UserActionTypes.js';

export function userAdded(user) {
	return {
		type: userActionType.USER_ADDED,
		payload: user
	};
}