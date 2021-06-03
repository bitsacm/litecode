import React, { Fragment, useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout'
import AllRooms from './screens/AllRooms';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Room from './screens/Room';
import Profile from './screens/Profile';

import AuthContext from './store/auth';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const hasRoom=true;

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Redirect to="/allrooms" /> : <Landing />}
          </Route>

          <Route path="/login">
            {isLoggedIn ? <Redirect to="/allrooms" /> : <Login />}
          </Route>

          <Route path="/signup">
            {isLoggedIn ? <Redirect to="/allrooms" /> : <Signup />}
          </Route>

          <Route path="/profile">
            {isLoggedIn ? <Profile /> : <Redirect to="/" />}
          </Route>

          <Route path="/room">
            {isLoggedIn ? 
            <Fragment>
              {hasRoom ? <Room /> : <Redirect to="/allrooms" />}
            </Fragment> : 
            <Redirect to="/" />}
          </Route>

          <Route path="/allrooms">
            {isLoggedIn ? <AllRooms /> : <Redirect to="/" />}
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
