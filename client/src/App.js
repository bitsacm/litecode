import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout'
import AllRooms from './screens/AllRooms';
import Landing from './screens/Landing';
import Room from './screens/Room';

import AuthContext from './store/auth';

function App() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const isLoggedIn = authCtx.isLoggedIn
  const hasRoom=true;

  const [mobile, setMobile] = useState(null);


  useEffect(() => {
    getMobile();
  }, [])

  const getMobile = () => {
    fetch('http://localhost:3000/users/me',
            {   
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token,
                }
            }
        ).then(response => 
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            if(res.data){
              if (res.data.userID.phoneNo) {
                const phone = res.data.userID.phoneNo
                setMobile(phone)
              }
            } else {
                alert("ERROR POSTING CONTENT.");
            }
        }))
}


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
            {isLoggedIn ? <AllRooms mobile={mobile} setMobile={setMobile}/> : <Redirect to="/" />}
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
