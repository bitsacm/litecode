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
                padding="30px" 
                margin="10px"
                bg="litegrey.20" 
                width="400px"
                borderRadius="10px"

            >
                <Heading
                    fontSize="28px"
                    color="litegrey.600"
                >{props.room.name}</Heading>
                <Box margin="0px">
                    <Flex flexDirection="row">
                        {props.room.members.map((member, index) => (
                            <Image 
                                src={member.pp} 
                                boxSize="20px" 
                                mr="5px" 
                                mt="5px"
                                mb="10px"
                                border="2px" 
                                borderColor="liteblue" 
                                borderRadius="100%" 
                            />
                        ))}
                    </Flex>
                </Box>
                <Text
                 fontSize="18px"
                 fontWeight="medium"
                 color="litegrey.400"
                >You’ll need to pay ₹{props.room.price} if you join</Text>
                <Button
                    width="80px"
                    mt="20px"
                    bg="liteblues"
                    color="liteblue"
                >Join</Button>
            </Flex>
           
        </Fragment>
    )
}

export default RoomCard;