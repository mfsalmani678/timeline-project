import React, {Component} from "react";
import routes, {resetGlobalRoutes} from "routes.js";
import TimelineMain from "views/Timeline/TimelineMain";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class TimelineLayoutPublic extends Component {

	state = {
      id: ''
  };

  
  //######################################## UTILITY FUNCTIONS ####################################

  //####################################### LIFECYCLE HOOKS ########################################

  componentDidMount(e) {
    let  timelineId  = this.props.match.params.id;
    this.setState({id: timelineId});
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  componentWillUpdate(e) {

  }

	componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

	render () {
		return (
      
			<React.Fragment>
        <div className="main-content" ref="mainContent">
          {this.state.id !== '' &&
            <TimelineMain {...this.props} key={'timelineMain-'+this.state.id} timelineId={this.state.id} childKey={this.state.id} publicView={true} />
          }
				</div>
			</React.Fragment>
		);
  }
  
}
export default withRouter(TimelineLayoutPublic);