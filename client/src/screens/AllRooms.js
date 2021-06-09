import React, { Fragment, useEffect, useState, useContext, useRef } from 'react'
import AuthContext from '../store/auth.js'
import { Redirect, Link } from 'react-router-dom'
import { DummyData } from '../resources/dummy.js'

import { 
    Flex, 
    Box, 
    Heading, 
    InputGroup,
    Spinner,
    InputLeftElement,
    Modal, 
    useDisclosure, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    FormControl, 
    FormLabel, 
    Input, 
    ModalFooter, 
    Button, 
    IconButton,
} from '@chakra-ui/react'

import {SearchIcon} from '@chakra-ui/icons'
import RoomCard from '../components/RoomCard.js'


const AllRooms = (props) => {

    const [allRooms, setAllRooms] = useState(null);
    const [callRooms, csetAllRooms] = useState(null);
    const [newf, setNewf] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [userInRoom, setUserInRoom] = useState(false);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;


    useEffect(() => {
        myDeets()
        getRooms()
    }, [redirect])

    const myDeets = () =>{
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
                if(res.data) {
                    if (res.data.user.inRoom) {
                        setUserInRoom(true)
                    }
                    else {
                        setUserInRoom(false)
                    }
                }
            }
        ))
    }


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
                    csetAllRooms(res.data)
                } else {
                    alert("ERROR RETRIEVING CONTENT.");
                }
            }))
    }

    const searchRef = useRef();

    const submitFunction = () => {
        const search = searchRef.current.value;

        fetch('http://localhost:3000/searchRoom/?roomName='+search,
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

    
    const matchesQuery = (arr, query) => {
        return arr.filter(el => (el.roomID).toLowerCase().indexOf(query.toLowerCase()) !== -1)
    }

    const handleChange = () => {
        setAllRooms(matchesQuery(callRooms, searchRef.current.value))
    }

    const updateRedirect = () => {
        setRedirect("pls redirect lol")
    }

    return(
        <Fragment>
        {redirect===null ? 
        <Flex width="100%"  flexDirection="column" justifyContent="center" alignItems="center">
            {allRooms ? 
            <Fragment>

            
            <Box margin="auto" display="flex" flexDirection={["column", "column", "row", "row", "row"]} justifyContent="center" alignItems="center"  width="100%">
                <InputGroup 
                    width={["350px", "80%", "40%", "40%", "40%"]}
                    height="0px"                
                    m="20px"    
                    mt="50px"
                    mb="70px"
                    border="none"
                >
                    <Input 
                        ml="5px" 
                        bg="#EDF2F7" 
                        border="none" 
                        color="litegrey.400" 
                        fontWeight="medium" 
                        height="40px" 
                        borderRadius="10" 
                        ref={searchRef}
                        onChange={handleChange}
                        placeholder="Looking for a friend's group?" 
                    />

                    {/* <IconButton 
                        aria-label="Search database" 
                        onClick={submitFunction} 
                        icon={<SearchIcon color="litegrey.600"/>} 
                        ml="5px" 
                        bg="#EDF2F7" 
                        border="none" 
                        color="litegrey.400" 
                    /> */}
                </InputGroup>
                <InitialFocus newf={newf} setRedirect={setRedirect}/>
            </Box>
            
            <Box display="flex" justifyContent="center" alignItems="center" margin="auto" width="100%" >
                {allRooms ? 
                <Flex margin="auto" flexDirection="row" width="100%" justifyContent={["center", "center", "center", "center", "flex-start"]} alignItems="center" flexWrap="wrap" marginTop="10px">
                    {allRooms.map((room, index)=>(
                        <RoomCard userInRoom={userInRoom} updateRedirect={updateRedirect} room={room} />
                    ))}
                </Flex>:null}
            </Box>
            </Fragment>: <Spinner />}
            
        </Flex>: <Redirect to="/room" />}
        </Fragment>
        
    )
}

const InitialFocus = (props) =>  {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef()
    const nameRef = React.useRef()
    const finalRef = React.useRef()

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
   

    const submitHandler = (e) => {
        e.preventDefault();

        const name = nameRef.current.value;

        fetch('http://localhost:3000/createRoom?roomName='+name,
                {
                    method: 'POST',
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
                    console.log("created")
                    props.setRedirect();
                } else {
                    alert("Authentication failed. Please try again.");
                }
            }))
    }


  
    return (
      <>
        <Button mt="20px" color="white" bg="liteblue" onClick={onOpen}>Create New Room</Button>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="litegrey.600">Create a new room</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel color="litegrey.600">Add a Room Name</FormLabel>
                <Input type="text" ref={nameRef} fontWeight="500" placeholder="Litecode by ACM" />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={submitHandler} bg="liteblues" color="liteblue" mr={3}>
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default AllRooms;