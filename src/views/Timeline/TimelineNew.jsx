import React, {Component} from "react";
// reactstrap components
import { Card, CardBody, Container, Row, Col, Button} from "reactstrap";
import NewTimelineFormModal from './Modals/NewTimelineFormModal.js'
import UserDAO from 'dao/UserDAO.js';

class TimelineNew extends Component {

	state = {
		modalOpen: false,
		showBackgroundCard: true,
		noOfTimelines: 0
	};

	toggle = () => {
		this.setState({...this.state, modalOpen: !this.state.modalOpen, showBackgroundCard: !this.state.showBackgroundCard})
	};

	componentDidMount() {
		document.body.classList.add("bg-default");
		const timelines =  UserDAO.getInstance().getUser().timelines;
    	if(timelines !== undefined && timelines !== null & timelines.length > 0) {
			this.setState({...this.state, noOfTimelines: timelines.length});
		}
	}

	componentWillUnmount() {
		document.body.classList.remove("bg-default");
	}

	getCardText(){
		if(this.state.noOfTimelines > 0) {
			return (
				<Col>
					<h1>Forgot to add another story?</h1>
					<h5>Start your new timeline project today</h5>
				</Col>
			);
		} else {
			return (
				<Col>
					<h1>You have no timelines yet</h1>
					<h5>Start your timeline project today</h5>
				</Col>
			);
		}

	}

	render() {
		return (
			<React.Fragment>
				 <Container className="ml-2 mt-4 pb-0"> 
					  <br/><br/><br/><br/><br/><br/>
					  <NewTimelineFormModal modal={this.state.modalOpen} toggle={this.toggle} />
					  {this.state.showBackgroundCard &&
					  <Row className="justify-content-center" style={{verticalAlign: "middle"}}>
						  <Col lg="7" md="7">
							<Card style={{boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.3)", background: "#FFFFFF"}}>
								<CardBody>
									<Row className="text-center">
										{this.getCardText()}
									</Row>
									<Row>
										<Col>
											&nbsp;
										</Col>
									</Row>
									<Row className="text-center">
										<Col>
					  						<Button className="btn btn-dark" style={{background: "#404040", borderRadius: "9px"}} onClick={this.toggle}>{this.state.noOfTimelines > 0 ? "Add another timeline" : "Add your first timeline"}</Button>
										</Col>
									</Row>
									<Row>
										<Col>
											&nbsp;
										</Col>
									</Row>
									<Row className="text-center">
										<Col>
											<h5>And show your awesome story</h5>
										</Col>
									</Row>
								</CardBody>
							</Card>
						  </Col>
					  </Row>
					  }
				 </Container>
			</React.Fragment>
		);
	}

}

export default TimelineNew;