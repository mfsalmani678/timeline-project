import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import JwtDAO from 'dao/JwtDAO.js';
import UserDAO from 'dao/UserDAO.js';
import store from "reduxStore/Store.js"
import {userAdded} from "reduxStore/actions/UserActions.js";

function ProtectedRoute({component: Component, ...rest}) {

	return (
		<Route {...rest} render={(props) => {
			let isAuth = true;
			const jwtDAO = new JwtDAO();
			const jwToken = jwtDAO.getJWT();
			isAuth = jwToken !== null ? true : false;
			
			
			if(isAuth) {
				const currentUser = store.getState().userState.user;
				if(currentUser === undefined) {
					const user = UserDAO.getInstance().getUser();
					store.dispatch(userAdded(user));
				} 
				return <Component {... props}/>;
			} else {
				console.log("Protected route unauthenticated");
				return <Redirect to={{pathname: '/', state: {from: props.location}}} />
			}
		}}/>
	);

}

export default ProtectedRoute;