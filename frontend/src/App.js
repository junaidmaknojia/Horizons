import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import GoogleSignUp from "./components/GoogleSignUp";
import GoogleLogIn from "./components/GoogleLogIn";


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
					<Route path="/members">
						<Members />
					</Route>
					<Route exact path="/linkedin-sign-up">
						<LinkedInSignUp />
					</Route>
					<Route exact path="/linkedin-log-in">
						<LinkedInLogIn />
					</Route>
					<Route exact path="/google-sign-up">
						<GoogleSignUp />
					</Route>
					<Route exact path="/google-log-in">
						<GoogleLogIn />
					</Route>
					<Route path={`/:id(\\d+)`}>
						<UserPage />
					</Route>
					<Route><h1>The page you're looking for doesn't exist</h1></Route>
				</Switch>
			)}
		</>
	);
}

export default App;
