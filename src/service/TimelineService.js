import JwtDAO from 'dao/JwtDAO.js';
import UserDAO from 'dao/UserDAO.js';
import store from "reduxStore/Store.js"
import {userAdded} from "reduxStore/actions/UserActions.js";
import BackendAPIDAO from 'dao/BackendAPIDAO.js';
import {timelineAdded} from "reduxStore/actions/TimelineActions.js";
import timelines from 'reduxStore/reducers/TimelineReducer';

class TimelineService {

    static myInstance = null;

    static getInstance() {
        if (TimelineService.myInstance == null) {
            TimelineService.myInstance = new TimelineService();
        }
        return this.myInstance;
    }

    // ######################################### CREATE TIMELINE ###############################################################

    createNewTimeline(timelineObj, newTimelineCallback) {

        const daoResponseCallback = (response) => {
            if(response.status === 200) {
                const updatedUser = JSON.parse(JSON.stringify(store.getState().userState.user));//{...store.getState().userState.user};
                let timelines = [...updatedUser.timelines];
                timelines.push({id: response.data.id, name: response.data.name});
                updatedUser.timelines = timelines;
                UserDAO.getInstance().saveUser(updatedUser);
                store.dispatch(userAdded(updatedUser));
                if(newTimelineCallback !== undefined) {
                    newTimelineCallback({success: true});
                }
            } else {
                if(newTimelineCallback !== undefined) {
                    newTimelineCallback({success: false});
                }
            }
        }

        const jwt = JwtDAO.getInstance().getJWT();
        const request = {
            api: 'timeline/create',
            requestBody: timelineObj,
            serviceCallback: daoResponseCallback,
            jwt: jwt
        }
        BackendAPIDAO.getInstance().post(request);
    }

    // ######################################### GET TIMELINE #####################################################################

    getTimelineInformation(timelineId) {

        const daoResponseCallback = (response) => {
            if(response.status === 200) {
                console.log("Timeline Object: ", response.data);
                store.dispatch(timelineAdded({...response.data, showLoading: false}));
            } else {
                alert("Something Is not right. Please check your Internet Connection and try again.");
            }
        }
        store.dispatch(timelineAdded({showLoading: true}));
        const jwt = JwtDAO.getInstance().getJWT();
        const request = {
            api: 'timeline/'+timelineId,
            serviceCallback: daoResponseCallback,
            jwt: jwt
        }
        BackendAPIDAO.getInstance().get(request);
    }

    getUpdatedTimelineInformation(timelineId) {
        const daoResponseCallback = (response) => {
            if(response.status === 200) {
                //store.dispatch(timelineAdded({...response.data, showLoading: false}));
                // console.log('Actual Store timeline Object: ', store.getState().timelines.timeline);
                const timeline = {...store.getState().timelines.timeline};
                timeline.updatedAt = response.data.updatedAt;
                store.dispatch(timelineAdded({...timeline, showLoading: false}));

            } else {
                alert("Something Is not right. Please check your Internet Connection and try again.");
            }
        }
        // store.dispatch(timelineAdded({showLoading: true}));
        const jwt = JwtDAO.getInstance().getJWT();
        const request = {
            api: 'timeline/'+timelineId,
            serviceCallback: daoResponseCallback,
            jwt: jwt
        }
        BackendAPIDAO.getInstance().get(request);
    }

    // ######################################### CREATE NEW TIMELINE GROUP ########################################################

    createNewTimelineGroup(timelineGroupName, newTimelineGroupCallback) {

        let updatedTimelineObj = store.getState().timelines.timeline;//JSON.parse(JSON.stringify(store.getState().timelines.timeline));
        const newGroup = {
            name: timelineGroupName,
            timelineId: updatedTimelineObj.id
        }

        const daoResponseCallback = (response) => {
            if(response.status === 200) {
                newGroup.id = response.data.id
                const timelineGroups = JSON.parse(JSON.stringify(updatedTimelineObj.groups));;//updatedTimelineObj.groups;
                timelineGroups.push(newGroup);
                updatedTimelineObj.groups = timelineGroups;
                store.dispatch(timelineAdded(updatedTimelineObj));
                  
                if(newTimelineGroupCallback !== undefined) {
                    newTimelineGroupCallback({success: true});   
                }
            } else {
                if(newTimelineGroupCallback !== undefined) {
                    newTimelineGroupCallback({success: false});
                }
            }
        }

        const jwt = JwtDAO.getInstance().getJWT();
        const request = {
            api: 'group/create',
            requestBody: newGroup,
            serviceCallback: daoResponseCallback,
            jwt: jwt
        }
        BackendAPIDAO.getInstance().post(request);
    }

    // ######################################### CREATE NEW TIMELINE ITEM ########################################################

    createNewTimelineItem(timelineItemObj, newTimelineItemCallback) {

        const daoResponseCallback = (response) => {
            if(response.status === 200) {
                    timelineItemObj.id = response.data.id
					
                    let updatedTimelineObj = store.getState().timelines.timeline;//JSON.parse(JSON.stringify(store.getState().timelines.timeline));
                    const timelineGroups = JSON.parse(JSON.stringify(updatedTimelineObj.groups));;//updatedTimelineObj.groups;
                    timelineGroups.forEach(group => {
                        if(group.id === timelineItemObj.groupId) {
                            if(group.events === undefined) {
                                group.events = []
                            }
                            group.events.push(timelineItemObj);
                        }
                    });
                    updatedTimelineObj.groups = timelineGroups;
                    store.dispatch(timelineAdded(updatedTimelineObj));
                if(newTimelineItemCallback !== undefined) {
                    newTimelineItemCallback({success: true});   
                }
            } else {
                if(newTimelineItemCallback !== undefined) {
                    newTimelineItemCallback({success: false});
                }
            }
        }

        const jwt = JwtDAO.getInstance().getJWT();
        const request = {
            api: 'event/create',
            requestBody: timelineItemObj,
            serviceCallback: daoResponseCallback,
            jwt: jwt
        }
        BackendAPIDAO.getInstance().post(request);

    }

}
export default TimelineService;