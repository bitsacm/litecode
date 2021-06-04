import React, { Fragment } from 'react'
import UserCard from '../components/UserCard.js'
import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react'
import { DummyData } from '../resources/dummy.js'

const Room = () => {
    const userIsAdmin=true;
    const room = DummyData.room
    return(
        <Fragment>
            <Heading 
                marginLeft="10px" 
                marginTop="40px"
                fontSize="32px"
                color="litegrey.600"
            >👏 It's a party!</Heading>

        <Flex flexDir="row">

            <Box display="flex" width="70%">
                <Flex margin="auto"flexDirection="row" flexWrap="wrap" marginTop="10px">
                    {room.members.map((member, index)=>(
                        <UserCard 
                            name={member.name}
                            imgUrl={member.imgUrl}
                            phone={member.phone}
                            isAdmin={member.isAdmin}
                            userIsAdmin={userIsAdmin}
                        />
                    ))}
                </Flex>
            </Box>
            <Box display="flex" flexDir="column" mt="40px" width="30%">
                <Heading
                    fontSize="20px"
                    color="litegrey.400"
                    fontWeight="medium"
                >Room Name</Heading>
                <Text
                 fontSize="28px"
                 color="litegrey.600"
                >{room.name}</Text>

                <Heading
                mt="20px"
                fontSize="20px"
                color="litegrey.400"
                fontWeight="medium">Members</Heading>
                <Text
                fontSize="28px"
                color="litegrey.600">{room.members.length} / 4</Text>

                <Heading
                 mt="20px"
                fontSize="20px"
                color="litegrey.400"
                fontWeight="medium">Per Member</Heading>
                <Text
                fontSize="28px"
                color="litegrey.600">₹ {room.price}</Text>

                {userIsAdmin ? 
                    <Button bg="liteblue" width="150px" mt="40px" color="white">Lock Group</Button> : 
                    <Button bg="red" width="150px" mt="40px" color="white">Leave Group</Button>}
            </Box>
            </Flex>
        </Fragment>
    )
}

export default Room;