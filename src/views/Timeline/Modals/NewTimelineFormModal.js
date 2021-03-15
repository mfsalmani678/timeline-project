import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import TimelineService from 'service/TimelineService.js';

class NewTimelineFormModal extends Component {

	state= {
		timelineTitle: '',
		timelineDesc: '',
		showLoading: false,
		saveError: '',
		saveSuccess: ''
	}

	constructor(){
		super();
		this.validator = new SimpleReactValidator();
	}

	setTimelineTitle = (event) => {
		// store.dispatch(timelineTitleAdded(event.target.value));Added capability to save the state to REDUX, so can uncomment if needed in future
		this.setState({...this.state, timelineTitle: event.target.value});
	}

	setTimelineDesc = (event) => {
		// store.dispatch(timelineDescAdded(event.target.value));Added capability to save the state to REDUX, so can uncomment if needed in future
		this.setState({...this.state, timelineDesc: event.target.value});
	}

	showProgressIndication () {
		if(this.state.showLoading === true) {
		return <i className="fas fa-sync fa-spin"></i>;
		}
	}

	newTimelineCallback = (timelineResponseFromService) => {
		if(timelineResponseFromService.success === true) {
			this.setState({...this.state, timelineTitle: '',timelineDesc: '' , showLoading: false, saveSuccess:'Timeline Saved Successfully.', saveError: ''});
			setTimeout(() => {this.props.toggle()}, 1000);
		} else {
			this.setState({...this.state, showLoading: false, saveError: 'Error Saving timeline. Please contact Support.', saveSuccess: ''});
		}
	}

	validateAndSaveTimeline = () => {
		if(this.validator.allValid()) {
			this.setState({...this.state, showLoading: true});
			const body = {"name": this.state.timelineTitle, "description": this.state.timelineDesc};
			TimelineService.getInstance().createNewTimeline(body, this.newTimelineCallback);
		} else {
			this.validator.showMessages();
      		this.forceUpdate();
		}
	}

	render() {
		return (
			<Row>
				<Col lg="7" md="7">
					<Modal isOpen={this.props.modal} toggle={this.props.toggle} className="">
						<ModalHeader toggle={this.props.toggle} ><h2>New Timeline</h2></ModalHeader>
						<ModalBody>
							{this.state.saveSuccess.length > 1 && <div className="text-success"> <i className="fas fa-check-circle"></i> {this.state.saveSuccess} </div>}
							{this.state.saveError.length > 1 && <div className="text-danger"> <i className="fas fa-exclamation-triangle"></i> {this.state.saveError} </div>}
							<FormGroup className="mb-3 mt-2">
								<InputGroup className="input-group-alternative" style={{ border: "1px solid #78909C", boxSizing: "border-box", boxRadius: "4px" }}>
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="fas fa-clock"></i>
										</InputGroupText>
									</InputGroupAddon>
									<Input placeholder="Timeline Title" type="email" value={this.state.timelineTitle} onChange={this.setTimelineTitle} autoComplete="new-email" />
								</InputGroup>
								{this.validator.message('timelineTitle', this.state.timelineTitle, 'required', { className: 'text-danger' })}
							</FormGroup>
							<FormGroup className="mb-3 mt-2">
								<InputGroup className="input-group-alternative" style={{ border: "1px solid #78909C", boxSizing: "border-box", boxRadius: "4px" }}>
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
										</InputGroupText>
									</InputGroupAddon>
									<Input placeholder="Timeline Description ..." type="textarea" value={this.state.timelineDesc} onChange={this.setTimelineDesc} rows="10" />
								</InputGroup>
							</FormGroup>
						</ModalBody>
						<ModalFooter>
							<Button className="btn btn-dark" style={{background: "#404040", borderRadius: "9px"}} disabled={this.state.showLoading} onClick={this.validateAndSaveTimeline}>
								{this.showProgressIndication()} &nbsp; Save Timeline
							</Button>{' '}
							<Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
						</ModalFooter>
					</Modal>
				</Col>
			</Row>
		);
	}

}

export default NewTimelineFormModal;