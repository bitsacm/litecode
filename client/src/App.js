import React, { Fragment, useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout'
import AllRooms from './screens/AllRooms';
import Landing from './screens/Landing';
import Room from './screens/Room';

import AuthContext from './store/auth';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = true;
  const hasRoom=true;

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Redirect to="/allrooms" /> : <Landing />}
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
