import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import TimelineService from 'service/TimelineService.js';

class NewGroupFormModal extends Component {
    state = { 
        timelineGroupName: '',
        showLoading: false,
		saveError: '',
		saveSuccess: ''
     }

     constructor() {
         super();
         this.validator = new SimpleReactValidator();
     }

     setTimelineGroupName = (event) => {
		// store.dispatch(timelineTitleAdded(event.target.value));Added capability to save the state to REDUX, so can uncomment if needed in future
		this.setState({timelineGroupName: event.target.value});
	}

    showProgressIndication () {
		if(this.state.showLoading === true) {
		return <i className="fas fa-sync fa-spin"></i>;
		}
	}

    newTimelineGroupCallback = (responseFromService) => {
        if(responseFromService.success === true) {
            this.setState({...this.state, showLoading: false, saveSuccess: 'Timeline Group Saved Successfully', saveError: ''});
            this.props.handleUpdateTimeline();
            setTimeout(() => {
                this.props.toggle();
                this.setState({...this.state, saveSuccess: '', timelineGroupName: ''});
            }, 1000);  
        } else {
            this.setState({...this.state, showLoading: false, saveError: 'Error Saving timeline. Please contact Support.', saveSuccess: ''});
        }
    }

    validateAndSaveGroup = (event) => {
        if(this.validator.allValid()) {
            this.setState({...this.state, showLoading: true});
            TimelineService.getInstance().createNewTimelineGroup(this.state.timelineGroupName, this.newTimelineGroupCallback);
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
						<ModalHeader toggle={this.props.toggle} ><h2>New Timeline Group</h2></ModalHeader>
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
									<Input placeholder="Timeline Group" type="text" value={this.state.timelineGroupName} onChange={this.setTimelineGroupName} autoComplete="new-timelineGroup" />
                                </InputGroup>
                                {this.validator.message('timelineGroup', this.state.timelineGroupName, 'required', { className: 'text-danger' })}
							</FormGroup>
						</ModalBody>
						<ModalFooter>
							<Button className="btn btn-dark" style={{background: "#404040", borderRadius: "9px"}} disabled={this.state.showLoading} onClick={this.validateAndSaveGroup}>
								{this.showProgressIndication()} &nbsp; Save Group
							</Button>{' '}
							<Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
						</ModalFooter>
					</Modal>
				</Col>
			</Row>
         );
    }
}
 
export default NewGroupFormModal;