import React, { Fragment, useEffect, useState, useContext } from 'react'
import AuthContext from '../store/auth.js'
import { useHistory } from 'react-router-dom'
import UserCard from '../components/UserCard.js'
import { 
    Flex, 
    Box, 
    Heading, 
    Text, 
    Button, 
    ButtonGroup,
    Spinner,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton, } from '@chakra-ui/react'
import { DummyData } from '../resources/dummy.js'
import { Redirect, Link } from 'react-router-dom'

const Room = () => {
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [roomDetails, updateRoomDetails] = useState(null)
    const [redirect, setRedirect] = useState(null);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const history = useHistory();

    useEffect(() => {
        loadRoom()
    }, [redirect])


    const loadRoom = () => {
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
                // console.log(res.data)
                if(res.data.user.inRoom){
                    setUserInfo(res.data)
                    const roomID = res.data.user.roomID
                    getRoomDetails(roomID);
                } else {
                    updateRedirect()
                }
            }))
    }

    const getRoomDetails = (roomID) => {
        fetch('http://localhost:3000/room/'+roomID,
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
                    updateRoomDetails(res.data)
                } else {
                    alert("ERROR POSTING CONTENT.");
                }
            }))
    }

    const lockRoom = () => {
        fetch('http://localhost:3000/lock',
                {   
                    method: 'PATCH',
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
                    loadRoom();
                } else {
                    alert("ERROR POSTING CONTENT.");
                }
            }))
    }

    const leaveRoom = () => {
        fetch('http://localhost:3000/leaveRoom',
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
                    updateRedirect()
                } else {
                    alert("ERROR POSTING CONTENT.");
                }
            }))
    }

    const updateRedirect = () => {
        setRedirect("non-null")
    }


    return(
        <Fragment>
        { redirect===null ?
        <Fragment>
            {roomDetails ? 
            <Fragment>
            {roomDetails.room.users.length===1 ?
            <Heading 
                marginLeft="10px" 
                marginTop="40px"
                fontSize="32px"
                color="litegrey.600"
            >🥺 It's lonely here. Invite your friends!</Heading> :
            <Heading 
                marginLeft="10px" 
                marginTop="40px"
                fontSize="32px"
                color="litegrey.600"
            >👏 It's a party!</Heading>
            }


        <Flex flexDir={["column", "column", "row", "row", "row"]}>

            <Flex 
                margin="auto" 
                justifyContent="flex-start" 
                alignItems="start"
                flexDirection="row" 
                mt="30px" 
                width={["100%", "100%", "70%", "70%", "70%"]}
                flexWrap="wrap"
            >
                {roomDetails.room.users.map((user, index)=>(
                    <UserCard 
                        name={user.userID.name}
                        id={user.userID._id}
                        imgUrl={user.userID.avatar}
                        phoneNo={user.userID.phoneNo}
                        loadRoom={loadRoom}
                        isAdmin={user.userID._id===roomDetails.room.roomAdmin}
                        userIsAdmin={(roomDetails.room.roomAdmin === userInfo.user._id)}
                    />
                ))}
            </Flex>

        <Box 
            display="flex" 
            flexDir="column" 
            width={["100%", "100%", "30%", "30%", "30%"]} 
            m="0" 
            p="0"
            ml={["10px", "30px", "0px", "0px", "0px"]}
        >
            <Box 
                display="flex" 
                flexDir={["row", "column", "column", "column", "column"]}
                mt={["20px", "20px", "40px", "40px", "40px"]}
                width="100%"
                flexWrap="wrap"
            >
                <Box mb="20px" mr="60px">
                    <Heading
                        fontSize="20px"
                        color="litegrey.400"
                        fontWeight="medium"
                    >Room Name</Heading>
                    <Text
                        fontSize="28px"
                        color="litegrey.600"
                        fontWeight="bold"
                        >{roomDetails.room.roomID}</Text>
                </Box>

                <Box mb="20px">
                    <Heading
                        fontSize="20px"
                        color="litegrey.400"
                        fontWeight="medium">Members</Heading>
                    <Text
                        fontSize="28px"
                        fontWeight="bold"
                        color="litegrey.600">{roomDetails.room.users.length} / 4</Text>
                </Box>

                <Box mb="20px" mr="60px">
                    <Heading
                        fontSize="20px"
                        color="litegrey.400"
                        fontWeight="medium">Per Member</Heading>
                    <Text
                        fontSize="28px"
                        color="litegrey.600"
                        fontWeight="bold"
                        >₹ {roomDetails.room.costPerMember}</Text>
                </Box>
            </Box>
            <Box 
                display="flex" 
                flexDir={["row", "column", "column", "column", "column"]}
                width="100%"
                flexWrap="wrap"
            >
                {(roomDetails.room.roomAdmin === userInfo.user._id) ? 
                    <Fragment> {roomDetails.room.roomLocked ? 
                        <Button 
                            bg="liteblue" 
                            width={["120px", "150px", "150px", "150px", "150px"]}
                            mt="20px" 
                            mr="20px"
                            color="white" 
                            onClick={lockRoom}
                            _hover={{ bg: "#81C8DC" }}
                            _active={{
                                bg: "#81C8DC",
                                transform: "scale(0.98)",
                                borderColor: "liteblue",
                            }}
                        >Unlock Group</Button> : 
                        <Button 
                            bg="liteblue" 
                            width={["120px", "150px", "150px", "150px", "150px"]}
                            mt="20px" 
                            mr="20px"
                            color="white" 
                            onClick={lockRoom}
                            _hover={{ bg: "#81C8DC" }}
                            _active={{
                                bg: "#81C8DC",
                                transform: "scale(0.98)",
                                borderColor: "liteblue",
                            }}
                        >Lock Group</Button>}
                         </Fragment>: null}
                    <ControlledUsage leaveRoom={leaveRoom} />
            </Box>
        </Box>
            </Flex>
            </Fragment>:<Spinner />}
        </Fragment> : <Redirect to="/allrooms" />}
        </Fragment>
    )
}


const ControlledUsage = (props) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const open = () => setIsOpen(!isOpen)
    const close = () => setIsOpen(false)
    return (
      <>
        <Button 
            width={["120px", "150px", "150px", "150px", "150px"]}
            mt="20px" 
            onClick={open}
            color="white" 
            bg="#E53E3E" 
            _hover={{ bg: "#EF7474" }}
            _active={{
                bg: "#EF7474",
                transform: "scale(0.98)",
                borderColor: "red",
            }}
        >Leave Group</Button>
        <Popover
          returnFocusOnClose={false}
          isOpen={isOpen}
          onClose={close}
          placement="right"
          closeOnBlur={false}
        >
          <PopoverContent>
            <PopoverHeader fontWeight="semibold" color="litegrey.600">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody color="litegrey.400">
              Are you sure you want to leave? You won't be able to join more rooms for 2 days.
            </PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button color="litegrey.400" variant="outline" onClick={close}>Cancel</Button>
                <Button 
                    onClick={props.leaveRoom} 
                    color="white" 
                    bg="#E53E3E" 
                    _hover={{ bg: "#EF7474" }}
                    _active={{
                        bg: "#EF7474",
                        transform: "scale(0.98)",
                        borderColor: "red",
                    }}
                >Leave</Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </>
    )
  }

export default Room;