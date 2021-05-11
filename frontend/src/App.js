import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import {useDispatch} from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import UserDashboard from "./components/UserDashboard";
import EditProfile from "./components/EditProfile";
import BrowseMentors from "./components/BrowseMentors";
import UserPage from "./components/UserPage";
import LinkedInSignUp from "./components/LinkedInSignUp";
import LinkedInLogIn from "./components/LinkedInLogIn";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/dashboard">
            <UserDashboard/>
          </Route>
          <Route path="/edit">
            <EditProfile />
          </Route>
          <Route path="/browse">
            <BrowseMentors />
          </Route>
          <Route exact path="/linkedin-sign-up">
            <LinkedInSignUp/>
          </Route>
          <Route exact path="/linkedin-log-in">
            <LinkedInLogIn/>
          </Route>
          <Route path="/:id">
            <UserPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
