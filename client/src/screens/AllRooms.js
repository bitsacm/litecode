import React, { Fragment, useEffect, useState, useContext } from 'react'
import AuthContext from '../store/auth.js'
import { Redirect, Link } from 'react-router-dom'
import { DummyData } from '../resources/dummy.js'

import { 
    Flex, 
    Box, 
    Heading, 
    Input,
    InputGroup,
    Spinner,
    InputLeftElement,
} from '@chakra-ui/react'

import {SearchIcon} from '@chakra-ui/icons'
import RoomCard from '../components/RoomCard.js'


const AllRooms = () => {

    const [allRooms, setAllRooms] = useState(null);

    const [redirect, setRedirect] = useState(null);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;


    useEffect(() => {
        getRooms()
    }, [redirect])

    const getRooms = () => {
        fetch('http://localhost:3000/rooms/',
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
                    console.log(res.data);
                    setAllRooms(res.data)
                } else {
                    alert("ERROR RETRIEVING CONTENT.");
                }
            }))
    }

    const updateRedirect =() => {
        setRedirect("pls redirect lol")
    }

    return(
        <Fragment>
        {redirect===null ? 
        <Flex width="100%"  flexDirection="column" justifyContent="center" alignItems="center">
            {allRooms ? 
            <Fragment>
            <Box margin="auto" display="flex"justifyContent="center" alignItems="center"  width="100%"><InputGroup 
                width={["350px", "80%", "40%", "40%", "40%"]}
                height="0px"                
                m="20px"    
                mt="50px"
                mb="70px"
                border="none"
             
            >

                <InputLeftElement
                    ml="5px"
                    pointerEvents="none"
                    children={<SearchIcon color="litegrey.600" />}
                />

                <Input 
                    ml="5px" 
                    bg="#EDF2F7" 
                    border="none" 
                    color="litegrey.400" 
                    fontWeight="medium" 
                    height="40px" 
                    borderRadius="10" 
                    placeholder="Looking for a friend's group?" 
                />

            </InputGroup></Box>
            
            <Box display="flex" width="100%" margin="auto">
                {allRooms ? 
                <Flex margin="auto" flexDirection="row" justifyContent="center" alignItems="center" flexWrap="wrap" marginTop="10px">
                    {allRooms.map((room, index)=>(
                        <RoomCard updateRedirect={updateRedirect} room={room} />
                    ))}
                </Flex>:null}
            </Box>
            </Fragment>: <Spinner />}
            
        </Flex>: <Redirect to="/room" />}
        </Fragment>
        
    )
}

export default AllRooms;