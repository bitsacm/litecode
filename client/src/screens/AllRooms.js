import React, { Fragment } from 'react'
import { DummyData } from '../resources/dummy.js'
import { Flex, Box, Heading } from '@chakra-ui/react'
import RoomCard from '../components/RoomCard.js'

const AllRooms = () => {
    const allRooms = DummyData.allRooms
    return(
        <div>
            <Heading marginLeft="10px" marginTop="40px">All Rooms</Heading>
            <Box display="flex" width="100%" margin="auto">
                <Flex margin="auto"flexDirection="row" flexWrap="wrap" marginTop="10px">
                    {allRooms.map((room, index)=>(
                        <RoomCard members={room.members} />
                    ))}
                </Flex>
            </Box>
        </div>
    )
}

export default AllRooms;