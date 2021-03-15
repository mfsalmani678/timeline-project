import * as timelineActions from 'reduxStore/actionTypes/TimelineActionTypes.js'

export default function timelines (state = {timeline: {showLoading: true}}, action) {
	
	switch(action.type) {
		case timelineActions.TIMELINE_ADDED:
		return  action.payload
		default:
			return state;
	}

}
