import userState from 'reduxStore/reducers/UserReducer.js';
import timelines from 'reduxStore/reducers/TimelineReducer.js';
import {combineReducers} from 'redux';

const reducers  = combineReducers({
	userState,
	timelines
});

export default reducers;