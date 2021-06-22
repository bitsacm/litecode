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

  const [mobile, setMobile] = useState("dummy");
  const [inRoom, setInRoom] = useState(null);


  useEffect(() => {
    getMobile();
    getRoom();
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
              else {
                setMobile(null)
              }
          }
        }))
  }

  const getRoom = () => {
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
              if (res.data.user.inRoom) {
                const smth = "yes"
                setInRoom(smth)
              }
              else {
                setInRoom(null)
              }
              console.log(inRoom)
          }
        }))
  }
  




  return (
    <div>
      <Layout>
        <Switch>
          {isLoggedIn ? 
            <Fragment>
              <Route path="/" exact>
                {mobile ? <Fragment>
                  {inRoom ? <Redirect to="/room" /> : <Redirect to="/allrooms" />}
                </Fragment> : <AddMobile setMobile={setMobile}/>}
              </Route>

              <Route path="/room">
              {mobile ? <Room /> : <AddMobile setMobile={setMobile}/>}
              </Route>

              <Route path="/allrooms">
                {mobile ? <AllRooms /> : <AddMobile setMobile={setMobile}/>}
              </Route>

            </Fragment> : 
            
            <Fragment>
              <Route path="/" exact>
                <Landing />
              </Route>

              <Route path="*">
                <Redirect to="/" />
              </Route>

            </Fragment>
          }

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

    const [refMobile, setRefMobile] = React.useState("")
    const handleChange = (event) => setRefMobile(event.target.value)


    const submitHandler = (e) => {
        e.preventDefault();

        if (refMobile.length === 10 && !(isNaN(refMobile))) {
            fetch('http://localhost:3000/users/me',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token,
                    },
                    body: JSON.stringify(
                        {
                            phoneNo: refMobile
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
                    props.setMobile(refMobile)
                } else {
                    alert("An account with this number already exists. Please try again.");
                }
            }))
        }
        else {
          alert("Please enter your valid phone number.")
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
                            <FormLabel fontWeight="medium" fontSize="24px" color="litegrey.600">WhatsApp Number</FormLabel>
                            <InputGroup>
                              <InputLeftAddon children="+91" />
                              <Input 
                                type="tel" 
                                fontWeight="medium" 
                                placeholder="phone number"
                                isInvalid={!(refMobile.length === 10) || isNaN(refMobile) && refMobile.length != 0} 
                                errorBorderColor="red.300"
                                borderColor="liteblue"
                                onChange={handleChange}
                              />
                            </InputGroup>
                            <FormHelperText fontSize="18px" fontWeight="medium" fontSize="18px">Please enter your 10-digit phone number.</FormHelperText>
                        </FormControl>
    
                        <Button
                            color="liteblue"
                            bg="liteblues"
                            onClick={submitHandler}
                            marginTop="30px"
                            padding="24px"
                            fontSize="22px"
                        >Add my number</Button>
                </Box>
            </Flex>
        </Fragment>
    )
}

// let AddMobile = setTimeout(AddSMobile, 2000);

export default App;
