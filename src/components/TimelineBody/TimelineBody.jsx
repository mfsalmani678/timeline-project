import React, { Component } from 'react';
import Timeline from "react-visjs-timeline";
import { connect } from "react-redux";
import moment from 'moment';
import { Row, Col, Button, Card, CardBody} from 'reactstrap';


class TimelineBody extends Component {

    state = {};

// ############################## TIMELINE BODY EVENT HANDLER FUNFCTIONS ################################################
	

     clickHandler(props) {
        console.log(props);
    }
    
    selectHandler = (props) => {
        console.log("selected");
        console.log(props);
    }
    
    onAddGroup = () => {
        console.log("A group is about to be added");
    }
// ############################## TIMELINE COMPONENT DATA-STRUCTURE FUNFCTIONS ##########################################
    getTimelineOptions = () => {
        return {
            selectable: true,
            editable: false,
            groupEditable: {
                add: true,
                remove: true,
            },
            groupOrder: 'id',
            stack: true,
            horizontalScroll: !true,
            autoResize: true,
            zoomable: true,
            zoomMin: 1000 * 60 * 60 * 24 * 365,
            zoomMax: 1000 * 60 * 60 * 24 * 365 * 150,
            onAddGroup: this.onAddGroup
          };
    }

    getTimelineItems = () => {
        var items = []
        if(this.props.eventsList.length > 0) {
            if(this.props.eventsList !== undefined && this.props.eventsList.length > 0) {
                items = this.props.eventsList.map(eventObj => {
                    return {
                        id: eventObj.id,
                        content: eventObj.name,
                        start: moment(eventObj.start_time, 'DD/mm/YYYY').format('YYYY-mm-DD'),
                        end: eventObj.end_time === undefined || eventObj.end_time === '' ? '' : moment(eventObj.end_time, 'DD/mm/YYYY').format('YYYY-mm-DD'),
                        type: eventObj.end_time === undefined || eventObj.end_time === '' ? 'point' : 'range',
                        group: eventObj.groupId,
                        className: eventObj.end_time === undefined || eventObj.end_time === '' ? "timeline-point" : "timleine-item",
                    };
                });
            }
        }
        return items;
    }

    getTimelineGroups = () => {

        var groups = [];
        
        groups = this.props.groups.map(group => {
            const itemsSize = group.events === undefined ? 0 : group.events.length;
            return  {
                id: group.id,
                content: group.name + '<br><span>' + itemsSize + " event(s)</span>",
                className: "timeline-group"
            }
        });
        
        return groups;
    }

    // ############################## TIMELINE BODY RENDER FUNFCTIONS ##########################################
    showBlankPlaceholder() {
        return (
            <>
                {this.props.groups.length === 0 &&
                <Row className="justify-content-center" style={{verticalAlign: "middle", marginTop: "8%", marginLeft: "3%"}}>
						  <Col lg="7" md="7">
							<Card style={{boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)", background: "#FFFFFF"}}>
								<CardBody>
									<Row className="text-center">
                                    <Col>
                                        <h1>Start your timeline</h1>
                                        <h3>2 Easy steps to get started:</h3>
                                    </Col>
									</Row>
                                    <Row>
                                        <Col>
                                            &nbsp;
                                        </Col>
                                    </Row>
									<Row className="text-center">
										<Col>
											<h5>
                                                
                                                    Click on "Add Group" to add timeline groups.
                                                    
                                                
                                            </h5>
                                            <h5>
                                             Click on "Add Event" to add the priceless events of your life.
                                            </h5>
										</Col>
									</Row>
								</CardBody>
							</Card>
						  </Col>
					  </Row>
                    }
            </>
            
        )
    }

    showLoadingElseContent() {
        if(this.props.showLoading) {
            let timelineLoadingPlaceholderStyle = {marginTop: "2%", marginLeft: "3%", width: "95%", height: "120%", position: "absolute"};
            if(this.props.publicView === true) {
                timelineLoadingPlaceholderStyle = {marginTop: "0%", marginLeft: "2%", width: "95%", height: "180%", position: "absolute"};
            }
			return (
                <>
                    {this.props.publicView === false && 
                        <Row className="animated-background" style={{marginLeft: "3%", marginRight: "2%", marginTop: "0%"}}>
                            <Col>
                                <div  style={{animationDuration: "2s", height: "100%", width: "100%"}}> &nbsp; <br/> &nbsp;</div>    
                            </Col>
                        </Row>
                    }
                    <div style={timelineLoadingPlaceholderStyle}>
                        <div className="animated-background" style={{animationDuration: "2s", height: "100%"}}> &nbsp;</div>
                    </div>
                </>
                )
		} else {
            const options = this.getTimelineOptions();
 
            const items = this.getTimelineItems();
          
            const groups = this.getTimelineGroups();
            
            const buttonFontStyle = {
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: "14px",
                lineHeight: "18px",
                alignItems: "center",
                letterSpacing: "-0.03em",
                color: "#274655",
                background: "#ECEFF1", 
                borderRadius: "99px",
                height: "32px",
                width: "121px"                
            }

            let timelineStyle = {};
            if(this.props.publicView === false) {
                timelineStyle = {marginTop: "3%", marginLeft: "3%"};
            }

                return ( 
                <React.Fragment>
                    {this.props.publicView === false &&
                    <Row style={{marginLeft: "3%", marginRight: "3%"}}>
                        <Col xs="6" sm="6" md="6" lg="2">
                            <Button style={buttonFontStyle} onClick={this.props.toggle}>
                                <i className="fas fa-plus"></i>
                                &nbsp;Add Group
                            </Button>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg="2">
                            <Button style={ buttonFontStyle} onClick={this.props.itemModalToggle}> 
                                <i className="fas fa-plus"></i> 
                                &nbsp;Add Event
                            </Button>
                        </Col>
                        {/* <Col xs="4" sm="4" md="6" lg="8" className="text-right">
                            <Button style={buttonFontStyle}> 
                                <i className="fas fa-cloud-upload-alt"></i> 
                                &nbsp;Publish Updates
                            </Button>
                        </Col> */}
                    </Row>
                    }
                    {this.showBlankPlaceholder()}
                    {this.props.groups.length > 0 && 
                        <div style={timelineStyle}>
                            <Timeline selectHandler={this.selectHandler} options={options} items={items} groups={groups} />
                        </div>
                    }
                </React.Fragment>
                );
            
		}
    }

    render() { 
          
        return (
            <>
                {this.showLoadingElseContent()}
            </>
            )
    }
} 

function mapStateToProps(state) {
    // component receives additionally:
    const groups = state.timelines.timeline.groups === undefined ? [] : state.timelines.timeline.groups;
    const eventsArray = groups.map(group => group.events === undefined ? [] : group.events);
    let denormEventsArray = [];
    eventsArray.forEach(events => {
        events.forEach( eventArray => {
            denormEventsArray.push(eventArray);
        })
        
    })
    console.log("State TO Props Events: ", denormEventsArray);
    return { groups: groups,
             eventsList: denormEventsArray,
             showLoading: state.timelines.timeline.showLoading }
}

export default connect(mapStateToProps)(TimelineBody);