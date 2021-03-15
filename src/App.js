import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth.js";
import TimelineLayout from "layouts/Timeline/TimelineLayout";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import TimelineLayoutPublic from 'layouts/Timeline/TimelineLayoutPublic';
import store from "reduxStore/Store.js"
import {Provider} from 'react-redux';

class App extends Component {
    state = {}

    render() { 
        return ( 
            <>
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                        <Route exact path="/timeline/public/:id" component={TimelineLayoutPublic} />
                        <ProtectedRoute path="/timeline" component={TimelineLayout} />
                        <ProtectedRoute exact path="/timeline/main" component={TimelineLayout} />
                        {/*<Route path="/timeline/main" render={props => <TimelineLayout {...props} />} />*/}
                        {/*<Route path="/timeline" render={props => <AdminLayout {...props} />} />*/}
                        <Route path="/auth" render={props => <AuthLayout {...props} />} />
                        <Redirect from="/" to="/auth" />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </>
         );
    }
}
 
export default App;