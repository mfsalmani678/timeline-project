import React, {Component} from "react";

// reactstrap components
import { /* Card, CardBody, */ CardTitle, Container, Row, Col, Button} from "reactstrap";
// import Button from "reactstrap/lib/Button";
import Moment from 'react-moment';
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

class TimelineHeader extends Component {
	
	componentDidMount() {
		// this.unsubscribe = store.subscribe(() => {
			// const timeline = store.getState().timelines.timeline;
			// this.setState({showLoading: false,
						//    mainHeading: timeline.name,
						//    public: "Public",
						//    description: timeline.description,
		// /				   created: timeline.createdAt,
						//    lastUpdated: timeline.updatedAt
						//   });
		// });
	}

	componentWillUnmount() {
		// this.unsubscribe();
	}

	

	showLoadingElseContent(content) {

		if(this.props.showLoading) {
			return <div className="animated-background"> &nbsp;</div>
		} else {
			return content;
		}
	}

	render() {
		return(
			<React.Fragment>
				<div className="header pb-3 pt-5 pt-md-3">
					<Container fluid>
						<div className="header-body">
							<Row>
								{this.props.publicView === true && 
									<Col xs="4" sm="3" md="3"  lg="3" xl="2" className="" style={{marginTop: "1.2%" }}>
										<img alt="" className="navbar-brand-img" src={require("assets/img/public-view/public-view-logo.png")}  />
									</Col>	
								}
								<Col xs="8" sm="9" md="9" lg="6" xl="4" className="">
									<Row>
										<div className="col">
											<CardTitle tag="h6" className="mb-0" style={{fontSize:"10px", fontFamily: "Space Mono", fontStyle:"normal", lineHeight: "16px", color: "#4C4C66", fontWeight: "bold"}}> 
												{this.props.publicView === true &&
												this.showLoadingElseContent("Public")
												}	
											</CardTitle>
											<span className="mb-0" style={{fontFamily: "Inter", fontSize:"30px", fontWeight: 800, fontStyle:"normal", letterSpacing: "-0.03em", color: "#404040", lineHeight: "38px"}}>
													
												{this.showLoadingElseContent(
													<>
													{this.props.publicView === false && 
														<>
														<CopyToClipboard text={window.location.origin + "/timeline/public/"+this.props.timeline.id} onCopy={() => {}}>
															<a href="javascript:void(0)" style={{color: "#404040"}} title="Copy Public URL">
																<i className="far fa-copy" />
															</a>
														</CopyToClipboard>
														&nbsp;&nbsp;
														</>
													}
													{this.props.timeline.name}
													</>
													)}
											</span>
											<p className="mt-0 mb-0" style={{opacity: 0.7, fontFamily: "Space Mono", fontSize: "14px" , fontStyle: "normal", fontWeight: "normal", letterSpacing: "2px", color: "#6F6C99", lineHeight: "20px"}}>
												<span className="text-wrap">
													{this.showLoadingElseContent(this.props.timeline.description)}
												</span>
											</p>
											
										</div>
									</Row>
									
								</Col>
								{this.props.publicView === false &&
									<Col lg="6" xl="4">
										<Row>
											<Col xs="3" sm="3" lg="3" xl="3">
												<CardTitle tag="h6" className="mb-0 mt-2" style={{fontFamily: "Space Mono", fontStyle:"normal", letterSpacing: "0px", color: "#4C4C66"}}> &nbsp; </CardTitle>
												<span className="mb-0" style={{fontFamily: "Inter", fontStyle:"normal", fontWeight:800, fontSize:"20px", lineHeight: "26px", letterSpacing: "-0.03em", color: "#404040"}}>
													{/*01.07.20*/} 
													{this.showLoadingElseContent(
														<Moment format="MM.DD.YY">
															{this.props.timeline.createdAt}
														</Moment>
													)}
												</span>
												<p className="mt-2 mb-0 " style={{fontFamily: "Inter", fontSize: "14px" , fontStyle: "normal", fontWeight: "normal", letterSpacing: "0px", color: "#6F6C99", lineHeight: "20px"}}>
													<span className="text-nowrap">
														{/*Created*/}
														{this.showLoadingElseContent("Created")}
													</span>
												</p>
											</Col>
											<Col xs="3" sm="3" lg="3" xl="3">
												<CardTitle tag="h6" className="mb-0 mt-2" style={{fontFamily: "Space Mono", fontStyle:"normal", letterSpacing: "0px", color: "#4C4C66"}}> &nbsp; </CardTitle>
												<span className="mb-0" style={{ fontFamily: "Inter", fontStyle:"normal", fontWeight:800, fontSize:"20px", lineHeight: "26px", letterSpacing: "-0.03em", color: "#404040"}}>
													{/*09.21.20*/} 
													{this.showLoadingElseContent(
														<Moment format="MM.DD.YY">
															{this.props.timeline.updatedAt}
														</Moment>
													)}
												</span>
												<p className="mt-2 mb-0 " style={{fontFamily: "Inter", fontSize: "14px" , fontStyle: "normal", fontWeight: "normal", letterSpacing: "0px", color: "#6F6C99", lineHeight: "20px"}}>
													<span className="text-nowrap">
														{/*Last Updated*/}
														{this.showLoadingElseContent("Last Updated")}
													</span>
												</p>
											</Col>
										</Row>
										
									</Col>
								}
							</Row>
							{this.props.publicView === false &&
								<>
								<Row>
									<Col lg="12" xl="12">
										&nbsp;
									</Col>
								</Row>
							
								<Row>
									<Col xs="6" sm="6" lg="4" xl="4">
										<Row>
											<Col xs="9" sm="6" lg="4" xl="4" >
												{this.showLoadingElseContent(
													<button className="btn btn-dark" style={{fontFamily: "Inter",background: "#404040", borderRadius: "9px"}}>
														<i className="fas fa-align-justify"></i>
														&nbsp;&nbsp;Custom
													</button>
													)}
												
											</Col>
											<Col xs="3" sm="6" lg="4" xl="4">
												{this.showLoadingElseContent(<button className="btn btn-outline-dark" style={{fontFamily: "Inter", borderRadius: "9px"}}>
																				<i className="fas fa-archive"></i>
																				&nbsp;&nbsp;Explore Data
																			</button>
																			)}
											</Col>
										</Row>
									</Col>
								</Row>
								</>
							}
						</div>
					</Container>
					<hr className="my-3" />
				</div>
			</React.Fragment>
		);
	}

}

function mapStateToProps(state) {
    // component receives additionally:
    return { timeline: state.timelines.timeline,
			 showLoading: state.timelines.timeline.showLoading}
}

export default connect(mapStateToProps)(TimelineHeader);