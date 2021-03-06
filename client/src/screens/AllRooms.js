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
    const [userRoom, setUserRoom] = useState(null);
    const [isBanned, setIsBanned] = useState(false);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;


    useEffect(() => {
        myDeets()
        getRooms()
    }, [redirect])

    const myDeets = () =>{
        fetch('https://litecode.bitsacm.in/server/users/me',
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
                    if (res.data.user.inRoom) setUserRoom(res.data.user.roomID);
                    else setUserRoom(null);

                    if (res.data.user.isBanned) setIsBanned(true)
                    else setIsBanned(false)    
                }
            }
        ))
    }


    const getRooms = () => {
        fetch('https://litecode.bitsacm.in/server/rooms/',
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

        fetch('https://litecode.bitsacm.in/server/searchRoom/?roomName='+search,
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
                    width={["100%", "400px", "40%", "40%", "40%"]}
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
                <InitialFocus newf={newf} userRoom={userRoom} isBanned={isBanned} setRedirect={setRedirect}/>
            </Box>
            
            <Box display="flex" justifyContent="center" alignItems="center" margin="auto" width="100%" >
                {allRooms ? 
                <Flex margin="auto" flexDirection="row" width="100%" justifyContent={["center", "center", "center", "center", "flex-start"]} alignItems="center" flexWrap="wrap" marginTop="10px">
                    {allRooms.map((room, index)=>(
                        <RoomCard userRoom={userRoom} updateRedirect={updateRedirect} isBanned={isBanned} room={room} />
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
    const [nameRef, setNameRef] = useState("")
    const finalRef = React.useRef()

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const handleChange = (event) => setNameRef(event.target.value)
   

    const submitHandler = (e) => {
        e.preventDefault();

        const name = nameRef;

        fetch('https://litecode.bitsacm.in/server/createRoom?roomName='+name,
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
        <Button 
            mb={["20px", "20px", "0px", "0px", "0px"]} mt={["-10px", "-10px", "20px", "20px", "20px"]}
            color="white" 
            bg="liteblue" 
            _hover={{ bg: "#81C8DC" }}
            _active={{
                bg: "#81C8DC",
                transform: "scale(0.98)",
                borderColor: "liteblue",
            }}
            onClick={onOpen}
            isDisabled={(props.userRoom || props.isBanned)}
            >Create New Room</Button>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
          size="md"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="litegrey.600">Create a new room</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel color="litegrey.600">Add a Room Name</FormLabel>
                <Input 
                    type="text" 
                    borderColor="liteblue"
                    onChange={handleChange} 
                    isInvalid={ nameRef.includes(',') || nameRef.includes('.') || nameRef.includes('/') || nameRef.includes('\\') || nameRef.includes('%')  || nameRef.includes('?')  || nameRef.includes('!')  || nameRef.includes('>')  || nameRef.includes('<')  || nameRef.includes('|')  || nameRef.includes('$')  || nameRef.includes('#')  || nameRef.includes('*')  || nameRef.includes('@')} 
                    errorBorderColor="red.300"
                    placeholder="Litecode by ACM" 
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button 
                onClick={submitHandler} 
                _hover={{ bg: "#F1FCFF" }}
                _active={{
                    bg: "#F1FCFF",
                    transform: "scale(0.98)",
                    borderColor: "liteblue",
                }}
                bg="liteblues" 
                color="liteblue" 
                isDisabled={ nameRef.includes(',') || nameRef.includes('.') || nameRef.includes('/') || nameRef.includes('\\') || nameRef.includes('%')  || nameRef.includes('?')  || nameRef.includes('!')  || nameRef.includes('>')  || nameRef.includes('<')  || nameRef.includes('|')  || nameRef.includes('$')  || nameRef.includes('#')  || nameRef.includes('*')  || nameRef.includes('@')}
                mr={3}
                >Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }


  

export default AllRooms;