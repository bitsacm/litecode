import React, { Fragment } from 'react'
import UserCard from '../components/UserCard.js'
import { Flex, Box, Heading } from '@chakra-ui/react'
import { DummyData } from '../resources/dummy.js'

const Room = () => {
    const room = DummyData.room
    return(
        <Fragment>
            <Heading marginLeft="10px" marginTop="40px">My Room</Heading>
            <Box display="flex" width="100%" margin="auto">
                <Flex margin="auto"flexDirection="row" flexWrap="wrap" marginTop="10px">
                    {room.members.map((member, index)=>(
                        <UserCard 
                            name={member.name}
                            pp={member.pp}
                            description={member.description}
                            phone={member.phone}
                        />
                    ))}
                </Flex>
            </Box>
        </Fragment>
    )
}

export default Room;