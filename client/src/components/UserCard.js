import React, { Fragment } from 'react'
import {
    Heading,
    Text,
    Image,
    Flex,

} from '@chakra-ui/react'

const UserCard = (props) => {
    return(
        <Fragment>
            <Flex 
                flexDirection="row" 
                padding="15px" 
                margin="30px"
                mt="30px"
                mb="20px"
                mr="50px"
                ml="0"
                bg="litegrey.20" 
                pr="100px"
                borderRadius="10px"
            >
                <Image src={props.imgUrl} boxSize="50px" borderRadius="100%" marginRight="20px"/>
                <Flex flexDirection="column">
                    <Heading fontSize="24px" color="litegrey.600">{props.name}</Heading>
                    <Text fontSize="20px" color="litegrey.400" fontWeight="medium">{props.phone}</Text>
                </Flex>
            </Flex>
        </Fragment>
    )
}

export default UserCard;