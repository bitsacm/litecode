import React, { Fragment, useEffect, useState, useContext } from 'react'
import AuthContext from '../store/auth.js'
import {
    Heading,
    Text,
    Image,
    Flex,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'


const UserCard = (props) => {

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const deleteUser = () => {
        fetch('http://localhost:3000/remove/'+props.id,
                {   
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token,
                    }
                }
            ).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                if(res.data){
                    console.log(res.data)
                    props.loadRoom();
                } else {
                    alert("ERROR POSTING CONTENT.");
                }
            }))
    }
   
    return(
        <Fragment>
            <Flex 
                flexDirection="row" 
                padding="15px" 
                mb={["20px", "20px", "30px", "30px", "30px"]}
                mr={["0px", "0px", "30px", "30px", "30px"]}
                pr={["20px", "20px", "20px", "20px", "20px"]}
                ml="0"
                bg="litegrey.20" 
                width={["300px", "350px", "380px", "380px", "380px"]}
                borderRadius="10px"
            >
                <Image src={props.imgUrl} boxSize="50px" borderRadius="100%" marginRight="20px"/>
                <Flex flexDirection="column">
                    <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Heading 
                        fontSize={["20px", "20px", "24px", "24px", "24px"]}
                        color="litegrey.600" 
                        >{props.name}</Heading>
                        {props.isAdmin ?
                         <Text
                            ml="30px"
                            bg="litegrey.600"
                            color="white"
                            pr="5px"
                            pl="5px"
                            fontSize={["12px", "12px", "18px", "18px", "18px"]}
                            borderRadius="2px"
                            fontWeight="medium"
                         >ADMIN</Text> 
                        : 
                        <Fragment>
                           {props.userIsAdmin ? <DeleteIcon cursor="pointer" w={5} h={5} color="litegrey.400" 
                           ml={["55px", "55px", "80px", "80px", "80px"]}
                           onClick={deleteUser}
                           /> : null}
                        </Fragment>}
                    </Flex>
                    <Text fontSize="20px" color="litegrey.400" fontWeight="medium">{props.phoneNo}</Text>
                </Flex>
            </Flex>
        </Fragment>
    )
}

export default UserCard;