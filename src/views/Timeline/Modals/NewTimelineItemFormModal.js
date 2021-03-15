import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup, Label } from 'reactstrap';
import store from "reduxStore/Store.js"
import {timelineAdded} from "reduxStore/actions/TimelineActions.js";
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';
import TimelineService from 'service/TimelineService.js';

class NewItemFormModal extends Component {
    state = { 
        timelineItemName: '',
        itemId: 0,
        groupId: '',
        itemType: 'range',
        startDate: '',
        endDate: '',
        startDateFieldType: 'text',
        endDateFieldType: 'text',
        showLoading: false,
		saveError: '',
		saveSuccess: ''
     }

     constructor() {
         super();
         this.validator = new SimpleReactValidator();
     }

    newTimelineItemCallback = (responseFromService) => {
        if(responseFromService.success === true) {
            this.setState({...this.state, 
                showLoading: false, 
                saveSuccess: 'Timeline Event Saved Successfully', 
                saveError: ''}); 
            this.props.handleUpdateTimeline();
            setTimeout(() => {
                    this.props.toggle();
                    this.setState({...this.state
                                    , saveSuccess: '',
                                    timelineItemName: '',
                                    itemId: 0,
                                    groupId: '',
                                    itemType: 'range',
                                    startDate: '',
                                    endDate: '',});
                }, 1000);
        } else {
            this.setState({...this.state, showLoading: false, saveError: 'Error Saving timeline. Please contact Support.', saveSuccess: ''});
        }
    }

    validateAndSaveItem = (event) => {
        let isValid = true;
        
        if(!this.validator.fieldValid('timelineEvent')) {
            isValid = false;
            this.validator.showMessageFor('timelineEvent');
        }

        if(!this.validator.fieldValid('Group')) {
            isValid = false;
            this.validator.showMessageFor('Group');
        }

        if(!this.validator.fieldValid('eventStartDate')) {
            isValid = false;
            this.validator.showMessageFor('eventStartDate');
        }
        if(this.state.itemType === 'range' && !this.validator.fieldValid('eventEndDate')) {
            isValid = false;
            this.validator.showMessageFor('eventEndDate');
        }
        
        if (isValid) {
            const groupId = parseInt(this.state.groupId);
            const newItem = {
                name: this.state.timelineItemName,
                type: this.state.itemType,
                start_time: moment(this.state.startDate, 'YYYY-mm-DD').format('DD/mm/YYYY'),
                end_time: this.state.endDate !== '' ? moment(this.state.endDate, 'YYYY-mm-DD').format('DD/mm/YYYY') : '',
                groupId: groupId
            };
            this.setState({...this.state, showLoading: true});
            TimelineService.getInstance().createNewTimelineItem(newItem,this.newTimelineItemCallback);
        } else {
            this.forceUpdate();
        }
        
    }

    getTimelineGroups() {
        let groups = [];
        if(store.getState().timelines.timeline !== undefined && store.getState().timelines.timeline.groups !== undefined) {
            groups = store.getState().timelines.timeline.groups;
        }
        return groups;
    }

    setTimelineItemName = (event) => {
		this.setState({...this.state, timelineItemName: event.target.value});
	}

    onGroupSelectChange = (event) => {
        this.setState({...this.state, groupId: event.target.value});
    }

    onItemTypeSelectChange = (event) => {
        let stateObj = {...this.state, itemType: event.target.value};
        if(event.target.value === 'point') {
            stateObj = {...this.state, itemType: event.target.value, endDate: ''};
        }
        this.setState(stateObj);
    }

    setStartDate = (event) => {
        this.setState({...this.state, startDate: event.target.value});
    }

    setEndDate = (event) => {
        this.setState({...this.state, endDate: event.target.value});
    }

    onStartDateFocus = (event) => {
        this.setState({...this.state, startDateFieldType: 'date'});
    }

    onStartDateBlur = (event) => {
        this.setState({...this.state, startDateFieldType: 'text'});
    }

    onEndDateFocus = (event) => {
        this.setState({...this.state, endDateFieldType: 'date'});
    }

    onEndDateBlur = (event) => {
        this.setState({...this.state, endDateFieldType: 'text'});
    }

    showProgressIndication () {
		if(this.state.showLoading === true) {
		return <i className="fas fa-sync fa-spin"></i>;
		}
	}

    render() { 
        let groups = this.getTimelineGroups();
        return ( 
            <Row>
				<Col lg="7" md="7">
					<Modal isOpen={this.props.modal} toggle={this.props.toggle} className="">
						<ModalHeader toggle={this.props.toggle} ><h2>New Timeline Event</h2></ModalHeader>
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
									<Input placeholder="Timeline Event" type="text" value={this.state.timelineItemName} onChange={this.setTimelineItemName} autoComplete="new-timelineGroup" />
                                </InputGroup>
                                {this.validator.message('timelineEvent', this.state.timelineItemName, 'required', { className: 'text-danger' })}
							</FormGroup>
                            <FormGroup className="mb-3 mt-2">
                                <InputGroup className="input-group-alternative" style={{ border: "1px solid #78909C", boxSizing: "border-box", boxRadius: "4px" }}>
                                    <Input type="select" name="select" id="groups" value={this.state.groupId} onChange={this.onGroupSelectChange}>
                                        <option value="" >Select Group</option>
                                        {groups.map(group => <option value={group.id}>{group.name}</option>)}
                                    </Input>
                                </InputGroup>
                                {this.validator.message('Group', this.state.groupId, 'required', { className: 'text-danger' })}
                            </FormGroup>
                            <FormGroup className="mb-3 mt-2">
                                <InputGroup className="input-group-alternative" style={{ border: "1px solid #78909C", boxSizing: "border-box", boxRadius: "4px" }}>
                                    <Input type="select" name="select" id="eventType" value={this.state.itemType} onChange={this.onItemTypeSelectChange}>
                                        <option value="range" >Event Type - Range</option>
                                        <option value="point" >Event Type - Point</option>
                                    </Input>
                                </InputGroup>
                                {this.validator.message('eventType', this.state.itemType, 'required', { className: 'text-danger' })}
                            </FormGroup>
                            <FormGroup className="mb-3 mt-2">
                                <InputGroup className="input-group-alternative" style={{ border: "1px solid #78909C", boxSizing: "border-box", boxRadius: "4px" }}>
                                    <Input type={this.state.startDateFieldType} name="startDate" id="startDate" 
                                            placeholder="Select Start Date" 
                                            onFocus={this.onStartDateFocus} 
                                            onBlur={this.onStartDateBlur}
                                            onChange={this.setStartDate}
                                            value={this.state.startDate} />
                                </InputGroup>
                                {this.validator.message('eventStartDate', this.state.startDate, 'required', { className: 'text-danger' })}
                            </FormGroup>
                            {this.state.itemType === 'range' &&
                                <FormGroup className="mb-3 mt-2">
                                    <InputGroup className="input-group-alternative" style={{ border: "1px solid #78909C", boxSizing: "border-box", boxRadius: "4px" }}>
                                        <Input type={this.state.endDateFieldType} name="endDate" id="endDate" 
                                                placeholder="Select End Date" 
                                                onFocus={this.onEndDateFocus} 
                                                onBlur={this.onEndDateBlur}
                                                onChange={this.setEndDate}
                                                value={this.state.endDate}/>
                                    </InputGroup>
                                    {this.validator.message('eventEndDate', this.state.endDate, 'required', { className: 'text-danger' })}
                                </FormGroup>
                            }
						</ModalBody>
						<ModalFooter>
							<Button className="btn btn-dark" style={{background: "#404040", borderRadius: "9px"}} disabled={this.state.showLoading} onClick={this.validateAndSaveItem}>
								{this.showProgressIndication()} &nbsp; Save Event
							</Button>{' '}
							<Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
						</ModalFooter>
					</Modal>
				</Col>
			</Row>
         );
    }
}
 
export default NewItemFormModal;