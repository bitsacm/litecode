import React from 'react'
import { Heading } from '@chakra-ui/react'
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout'
import AllRooms from './screens/AllRooms';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Room from './screens/Room';


function App() {
  // const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  const isLoggedIn = true;
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

          <Route path="/room">
            {hasRoom ? <Room /> : <Redirect to="/allrooms" />}
          </Route>

          <Route path="/allrooms">
            {hasRoom ?  <Redirect to="/room" /> : <AllRooms />}
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
