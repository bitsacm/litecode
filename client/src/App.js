import React, { Fragment, useContext, useState, useEffect, useRef } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout'
import AllRooms from './screens/AllRooms';
import Landing from './screens/Landing';
import Room from './screens/Room';

import { 
  Button, 
  Flex, 
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';

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
              if (res.data.user.phoneNo) {
                const phone = res.data.user.phoneNo
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
          {isLoggedIn ? <Fragment>
           {mobile ?  <Fragment>
             {hasRoom ?  <Fragment>

              <Route path="/" exact>
                <Redirect to="/allrooms" />
              </Route>

              <Route path="/room">
                <Room />
              </Route>

              <Route path="/allrooms">
                <AllRooms />
              </Route>

             </Fragment> :  <Fragment>

                <Route path="/" exact>
                  <Redirect to="/allrooms" />
                </Route>

                <Route path="/room">
                  <Redirect to="/allrooms" />
                </Route>

                <Route path="/allrooms">
                  <AllRooms />
                </Route>
        
               </Fragment>}
           </Fragment> :  <Fragment>


                <Route path="/" exact>
                  <AddMobile setMobile={setMobile}/>
                </Route>

                <Route path="/room">
                  <AddMobile setMobile={setMobile}/>
                </Route>

                <Route path="/allrooms">
                  <AddMobile setMobile={setMobile}/>
                </Route>
           </Fragment> }
          </Fragment> :  <Fragment>

            <Route path="/" exact>
              <Landing />
            </Route>

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Fragment>}

          <Route path="*">
            <Redirect to="/" />
          </Route>

        </Switch> 
      </Layout>
    </div>
  );
}

const AddMobile = (props) => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const mobileRef = useRef();


    const submitHandler = (e) => {
        e.preventDefault();

        const mobile = mobileRef.current.value;

        if (mobile) {
            fetch('http://localhost:3000/users/me',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token,
                    },
                    body: JSON.stringify(
                        {
                            phoneNo: mobile
                        }
                    ),
                }
            ).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                if(res.data){
                    props.setMobile(mobile)
                } else {
                    alert("Please try again.");
                }
            }))
        }
    }


    return(
        <Fragment>
            <Flex 
                margin="auto" 
                marginTop="50px" 
                justifyContent="center" 
                alignItems="center">
            
                <Box 
                    width="550px"
                    padding="50px"
                    borderRadius="5px"
                    border="5"
                    borderColor="grey.20">
                
                        <FormControl id="email">
                            <FormLabel fontWeight="medium" fontSize="24px" color="litegrey.600">Mobile Number</FormLabel>
                            <InputGroup>
                              <InputLeftAddon children="+91" />
                              <Input type="tel" fontWeight="medium" placeholder="phone number" ref={mobileRef} />
                            </InputGroup>
                            <FormHelperText fontSize="18px" fontWeight="medium">Enter your mobile number.</FormHelperText>
                        </FormControl>
    
                        <Button
                            color="liteblue"
                            bg="liteblues"
                            onClick={submitHandler}
                            marginTop="30px"
                            padding="24px"
                            fontSize="22px"
                        >Add Mobile Number</Button>
                </Box>
            </Flex>
        </Fragment>
    )
}

export default App;
