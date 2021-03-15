import React, {Component} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes, {resetGlobalRoutes} from "routes.js";
// import store from "reduxStore/Store.js"
import TimelineMain from "views/Timeline/TimelineMain";
import { connect } from "react-redux";
import LoginService from 'service/LoginService.js';
import IdleTimer from 'react-idle-timer';

class TimelineLayout extends Component {

	state = {

      showTimelineMain: false,
      showTimelineBlank: false,
      isLoggedIn: true,
      timeout:1000 * 600, //Setting 10 minutes session timeout
      isTimedOut: false

  };

  //######################################## TIMEOUT/IDLE HANDLERS ################################

  onAction = (e) => {
    if(this.state.isTimedOut !== false) {
       this.setState({...this.state, isTimedOut: false})
    }
  }
 
  onActive = (e) => {
      this.setState({...this.state, isTimedOut: false})
  }
 
  onIdle = (e) => {
      const isTimedOut = this.state.isTimedOut
      if (isTimedOut) {
          this.logout();
      } else {
        this.idleTimer.reset();
        this.setState({...this.state, isTimedOut: true, isLoggedIn: false})
      }
      
  }

  //######################################## LOGOUT HANDLER #######################################

  logout = () => {
    LoginService.getInstance().doLogout();
    this.setState({...this.state, isLoggedIn: false});
  }
  
  //######################################## UTILITY FUNCTIONS ####################################
  getRoutes = routes => {
    return routes.map(({component: Cmp, ...prop}, key) => {
      if (prop.layout === "/timeline") {
        return (
          <Route path={prop.layout + prop.path} render={props => <Cmp {...props} publicView={false} key={'timelineMain-'+prop.id} timelineId={prop.id} childKey={prop.id} />} key={'route-'+key} />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  //####################################### LOADING TIMELINE CONTENT ###############################

  fetchTimelineContent(e) {
    const timelines =  this.props.userTimelines;
    let newState;
    if(timelines !== undefined && timelines !== null & timelines.length > 0) {
      newState = {...this.state, showTimelineMain: true}
    } else {
      newState = {...this.state, showTimelineBlank: true}
    }
    return newState;
  }

  addTimelineRoutes(){
    resetGlobalRoutes();
    const timelines =  this.props.userTimelines;
    if(timelines !== undefined && timelines !== null & timelines.length > 0) {
      timelines.forEach(timeline => {
        const newRoute = {
          path: "/main/"+timeline.id,
          name: timeline.name,
          icon: "ni ni-list-67 text-primary",
          component: TimelineMain,
          layout: "/timeline",
          id: timeline.id
        }
        routes.push(newRoute);
      });
    }
  }

  //####################################### LIFECYCLE HOOKS ########################################

  componentDidMount(e) {
    this.addTimelineRoutes();
    this.setState(this.fetchTimelineContent(e));
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
    resetGlobalRoutes();
  }

  componentWillUpdate(e) {
  }

	componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

	render () {
    this.addTimelineRoutes();
		return (
      
			<React.Fragment>
        <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            timeout={this.state.timeout} />

        {
          !this.state.isLoggedIn &&
          <Redirect to={{pathname: '/', state: {from: this.props.location}}} />
        }
				<Sidebar {...this.props} routes={routes} logout={this.logout} logo={{ innerLink: "/admin/index", imgSrc: require("assets/img/sidebar/cntxt-sidenav-logo.png"), imgAlt: "..."}}/>
				<div className="main-content" ref="mainContent">
					 <Switch>
						{this.getRoutes(routes)}
            <Redirect from="*" to="/timeline/new" />

					</Switch>
          {/*<TimelineMain {...this.props} />*/}
				</div>
			</React.Fragment>
		);
  }
  
}
function mapStateToProps(state) {
  // component receives additionally:
  return { userTimelines: state.userState.user.timelines }
}
export default connect(mapStateToProps)(TimelineLayout)