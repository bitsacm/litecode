import React, {Fragment} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout'
import AllRooms from './screens/AllRooms';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Room from './screens/Room';
import Profile from './screens/Profile';


function App() {
  // const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  const isLoggedIn = false;
  const hasRoom = false;

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Redirect to="/allrooms" /> : <Landing />}
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/signup">
            <Profile />
          </Route>

          <Route path="/room">
            {isLoggedIn ? 
            <Fragment>
              {hasRoom ? <Room /> : <Redirect to="/allrooms" />}
            </Fragment> : 
            <Redirect to="/" />}
          </Route>

          <Route path="/allrooms">
            {isLoggedIn ? 
            <Fragment>
              {hasRoom ? <Redirect to="/room" /> : <AllRooms />}
            </Fragment> :
            <Redirect to="/" />}
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
