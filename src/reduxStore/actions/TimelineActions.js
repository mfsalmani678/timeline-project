import * as timelineActionTypes from 'reduxStore/actionTypes/TimelineActionTypes.js';

export function timelineTitleAdded(timelineTitle) {
	return {
		type: timelineActionTypes.TIMELINE_TITLE_ADDED,
		payload: timelineTitle
	};
}

export function timelineDescAdded(timelineDesc) {
	return {
		type: timelineActionTypes.TIMELINE_DESC_ADDED,
		payload: timelineDesc
	};
}

export function timelineAdded(timeline) {
	return {
		type: timelineActionTypes.TIMELINE_ADDED,
		payload: 
		{
			// id: timelineObj.id,
			// "timeline": timelineObj
			timeline
		}
	};
}
