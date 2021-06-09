import React, { Fragment, useEffect, useState, useContext } from 'react'
import AuthContext from '../store/auth.js'
import { useHistory } from 'react-router-dom'
import UserCard from '../components/UserCard.js'
import { Flex, Box, Heading, Text, Button, Spinner } from '@chakra-ui/react'
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
            <Heading 
                marginLeft="10px" 
                marginTop="40px"
                fontSize="32px"
                color="litegrey.600"
            >👏 It's a party!</Heading>

        <Flex flexDir={["column", "column", "row", "row", "row"]}>

            <Box display="flex" width="70%">
                <Flex margin="auto"flexDirection="row" mt="30px" flexWrap="wrap">
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
            </Box>
            <Box display="flex" flexDir="column" mt="40px" 
            width={["70%", "70%", "30%", "30%", "30%"]}
            >
                <Heading
                    fontSize="20px"
                    color="litegrey.400"
                    fontWeight="medium"
                >Room Name</Heading>
                <Text
                 fontSize="28px"
                 color="litegrey.600"
                >{roomDetails.room.roomID}</Text>

                <Heading
                mt="20px"
                fontSize="20px"
                color="litegrey.400"
                fontWeight="medium">Members</Heading>
                <Text
                fontSize="28px"
                color="litegrey.600">{roomDetails.room.users.length} / 4</Text>

                <Heading
                 mt="20px"
                fontSize="20px"
                color="litegrey.400"
                fontWeight="medium">Per Member</Heading>
                <Text
                fontSize="28px"
                color="litegrey.600">₹ {roomDetails.room.costPerMember}</Text>

                {(roomDetails.room.roomAdmin === userInfo.user._id) ? 
                    <Fragment> {roomDetails.room.roomLocked ? 
                        <Button bg="liteblue" width="150px" mt="40px" mb="-30px" color="white" onClick={lockRoom}>Unlock Group</Button>: 
                        <Button bg="liteblue" width="150px" mt="40px" mb="-30px" color="white" onClick={lockRoom}>Lock Group</Button>}
                         </Fragment>: null}
                    <Button bg="red" width="150px" mt="40px" color="white" onClick={leaveRoom}>Leave Group</Button>
            </Box>
            </Flex>
            </Fragment>:<Spinner />}
        </Fragment> : <Redirect to="/allrooms" />}
        </Fragment>
    )
}

export default Room;