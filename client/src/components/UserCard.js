import React, { Fragment } from 'react'
import {
    Heading,
    Text,
    Image,
    Flex,
    

} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'


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
                width="350px"
                borderRadius="10px"
            >
                <Image src={props.imgUrl} boxSize="50px" borderRadius="100%" marginRight="20px"/>
                <Flex flexDirection="column">
                    <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Heading fontSize="24px" color="litegrey.600">{props.name}</Heading>
                        {props.isAdmin ?
                         <Text
                            ml="20px"
                            bg="litegrey.600"
                            color="white"
                            pr="5px"
                            pl="5px"
                            fontSize="18px"
                            borderRadius="2px"
                         >ADMIN</Text> 
                        : 
                        <Fragment>
                           {props.userIsAdmin ? <DeleteIcon cursor="pointer" w={5} h={5} color="litegrey.400" ml="80px"/> : null}
                        </Fragment>}
                    </Flex>
                    <Text fontSize="20px" color="litegrey.400" fontWeight="medium">{props.phone}</Text>
                </Flex>
            </Flex>
        </Fragment>
    )
}

export default UserCard;