import React, {Component} from "react";
import TimelineHeader from "components/Headers/TimelineHeader";
import TimelineBody from "components/TimelineBody/TimelineBody";
import NewGroupFormModal from 'views/Timeline/Modals/NewTimelineGroupFormModal.js';
import NewItemFormModal from 'views/Timeline/Modals/NewTimelineItemFormModal.js';
import TimelineService from 'service/TimelineService.js';

class TimelineMain extends Component {

	state = {
		modalOpen: false,
		itemModalOpen: false
	};

	fetchTimeline() {
		let id = this.props.timelineId;
		TimelineService.getInstance().getTimelineInformation(id);
	}

	fetchUpdatedTimeline = () => {
		let id = this.props.timelineId;
		// console.log("Timeline ID to Update : " + id);
		TimelineService.getInstance().getUpdatedTimelineInformation(id);
	}

	componentDidMount() {
		this.fetchTimeline();
	}

	componentDidUpdate(e) {
		//this.fetchTimeline();
	}

	toggle = () => {
		this.setState({...this.state, modalOpen: !this.state.modalOpen})
	};

	itemModalToggle = () => {
		this.setState({...this.state, itemModalOpen: !this.state.itemModalOpen});
	}

	render() {
		return (
			<React.Fragment>
				<TimelineHeader {...this.props} key={'TimelineHeader-'+this.props.childKey}/>
				<TimelineBody {...this.props} key={'TimelineBody-'+this.props.childKey} toggle={this.toggle} itemModalToggle={this.itemModalToggle}/>
				<NewGroupFormModal modal={this.state.modalOpen} toggle={this.toggle} handleUpdateTimeline={this.fetchUpdatedTimeline}></NewGroupFormModal>
				<NewItemFormModal modal={this.state.itemModalOpen} toggle={this.itemModalToggle} handleUpdateTimeline={this.fetchUpdatedTimeline}></NewItemFormModal>
			</React.Fragment>
		);
	}

}

export default TimelineMain;