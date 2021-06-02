import React, { Fragment } from 'react'
import {
    Heading,
    Text,
    Image,
    Flex,
    Box,
    Button
} from '@chakra-ui/react'

const RoomCard = (props) => {
    return(
        <Fragment>
            <Flex 
                flexDirection="column" 
                padding="20px" 
                margin="10px"
                bg="lite" 
                width="400px"
                borderRadius="10px"
            >
                {props.members.map((member, index) => (
                    <Box margin="10px">
                        <Flex flexDirection="row">
                            <Image src={member.pp} boxSize="70px" borderRadius="100%" marginRight="20px"/>
                            <Flex flexDirection="column">
                                <Heading fontSize="20px">{member.name}</Heading>
                                <Text fontSize="16px">{member.description}</Text>
                                <Text fontSize="16px">{member.phone}</Text>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
                <Button>Join this room</Button>
            </Flex>
           
        </Fragment>
    )
}

export default RoomCard;