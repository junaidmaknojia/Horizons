import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import {useDispatch} from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import BrowseMentors from "./components/BrowseMentors";

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
          <Route exact path="/user">
            <UserProfile/>
          </Route>
          <Route path="/edit">
            <EditProfile />
          </Route>
          <Route path="/browse">
            <BrowseMentors />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
