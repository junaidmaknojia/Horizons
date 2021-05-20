import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import UserDashboard from "./components/UserDashboard";
import EditProfile from "./components/EditProfile";
import BrowseMentors from "./components/BrowseMentors";
import UserPage from "./components/UserPage";
import LinkedInSignUp from "./components/LinkedInSignUp";
import LinkedInLogIn from "./components/LinkedInLogIn";
import Members from "./components/Members";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			{sessionUser && (
				<Navigation isLoaded={isLoaded} />
			)}
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<Homepage isLoaded={isLoaded} />
					</Route>
					<Route path="/dashboard">
						<UserDashboard />
					</Route>
					<Route path="/edit">
						<EditProfile />
					</Route>
					<Route path="/browse">
						<BrowseMentors />
					</Route>
					<Route>
						<Members />
					</Route>
					<Route exact path="/linkedin-sign-up">
						<LinkedInSignUp />
					</Route>
					<Route exact path="/linkedin-log-in">
						<LinkedInLogIn />
					</Route>
					<Route path="/:id">
						<UserPage />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
