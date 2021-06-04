import React, { Fragment } from 'react'
import { DummyData } from '../resources/dummy.js'

import { 
    Flex, 
    Box, 
    Heading, 
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react'

import {SearchIcon} from '@chakra-ui/icons'
import RoomCard from '../components/RoomCard.js'

const AllRooms = () => {
    const allRooms = DummyData.allRooms;
    
    return(
        <div>
            <InputGroup 
                width="40%" 
                margin="auto"
                height="0px"                    
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

            </InputGroup>
            
            <Box display="flex" width="100%" margin="auto">
                <Flex margin="auto"flexDirection="row" flexWrap="wrap" marginTop="10px">
                    {allRooms.map((room, index)=>(
                        <RoomCard room={room} />
                    ))}
                </Flex>
            </Box>
        </div>
    )
}

export default AllRooms;