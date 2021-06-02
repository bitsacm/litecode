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
                padding="20px" 
                margin="10px"
                bg="lite" 
                width="400px"
                borderRadius="10px"
            >
                <Image src={props.pp} boxSize="100px" borderRadius="100%" marginRight="20px"/>
                <Flex flexDirection="column">
                    <Heading fontSize="32px">{props.name}</Heading>
                    <Text fontSize="24px">{props.description}</Text>
                    <Text fontSize="22px">{props.phone}</Text>
                </Flex>
            </Flex>
        </Fragment>
    )
}

export default UserCard;