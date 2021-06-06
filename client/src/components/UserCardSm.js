import React, { Fragment } from 'react'
import {
    Heading,
    Text,
    Image,
    Flex,
} from '@chakra-ui/react'


const UserCardSm = (props) => {
    return(
        <Fragment>
            <Flex 
                flexDirection="row" 
                padding="15px" 
                mt="0px"
                mb="20px"
                mr="50px"
                ml="0"
                bg="litegrey.20" 
                width="250px"
                borderRadius="10px"
                alignItems="center"
            >
                <Image src={props.user.imgUrl} boxSize="30px" borderRadius="100%" marginRight="20px"/>
                <Flex flexDirection="column">
                    <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Heading fontSize="18px" color="litegrey.600">{props.user.name}</Heading>
                        {props.user.isAdmin ?
                         <Text
                            ml="10px"
                            bg="litegrey.600"
                            color="white"
                            pr="2px"
                            pl="2px"
                            fontSize="14px"
                            borderRadius="2px"
                         >ADMIN</Text> 
                        : 
                        null}
                    </Flex>
                    <Text fontSize="14px" color="litegrey.400" fontWeight="medium">{props.user.phone}</Text>
                </Flex>
            </Flex>
        </Fragment>
    )
}

export default UserCardSm;