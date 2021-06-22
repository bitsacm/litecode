import React, { Fragment, useEffect, useState, useContext } from 'react'
import AuthContext from '../store/auth.js'
import {
    Heading,
    Text,
    Image,
    Flex,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    ButtonGroup,
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

    const cleanName = (str) => {
        return str.split(' ')
            .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(' ')
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
                width={["300px", "350px", "400px", "400px", "400px"]}
                borderRadius="10px"
            >
                <Image src={props.imgUrl} boxSize="50px" borderRadius="100%" marginRight="20px"/>
                <Flex flexDirection="column">
                    <Flex 
                        flexDirection="row" 
                        width={["180px", "250px", "300px", "300px", "300px"]} 
                        justifyContent="space-between" 
                        alignItems="center">
                        <Flex 
                            width="100%" 
                            justifyContent="space-between" 
                            alignItems="center">
                                <Heading 
                                    fontSize={["20px", "20px", "24px", "24px", "24px"]}
                                    color="litegrey.600" 
                                    isTruncated
                                >{cleanName(props.name)}</Heading>
                            
                            {props.isAdmin ?
                            <Text
                                ml={["25px", "30px", "40px", "40px", "45px"]}
                                bg="litegrey.600"
                                color="white"
                                pr="5px"
                                pl="5px"
                                fontSize={["12px", "12px", "18px", "18px", "18px"]}
                                borderRadius="2px"
                                fontWeight="medium"
                            >ADMIN</Text> 
                            : <Fragment>
                            {props.userIsAdmin ? 
                               <ControlledUsage deleteUser={deleteUser} /> : null}
                            </Fragment>}
                        </Flex>
                    </Flex>
                    <Text fontSize="20px" color="litegrey.400" fontWeight="medium">{props.phoneNo}</Text>
                </Flex>
            </Flex>
        </Fragment>
    )
}


const ControlledUsage = (props) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const open = () => setIsOpen(!isOpen)
    const close = () => setIsOpen(false)
    return (
      <>
        <Fragment>
            <DeleteIcon 
                cursor="pointer" w={5} h={5} 
                color="litered" 
                _hover={{ color: "#EF7474" }}
                ml={["55px", "55px", "80px", "80px", "80px"]}
                onClick={open}
            /> 
            <Popover
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={close}
                placement="right"
                closeOnBlur={false}
            >
            <PopoverContent>
                <PopoverHeader fontWeight="semibold" color="litegrey.600">Confirmation</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody color="litegrey.400">
                    Are you sure you want to remove this member from the room? This action cannot be undone.
                </PopoverBody>
                <PopoverFooter d="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                    <Button color="litegrey.400" variant="outline" onClick={close}>Cancel</Button>
                    <Button 
                        onClick={props.deleteUser} 
                        color="white" 
                        bg="#E53E3E" 
                        _hover={{ bg: "#EF7474" }}
                        _active={{
                            bg: "#EF7474",
                            transform: "scale(0.98)",
                            borderColor: "red",
                        }}
                    >Remove</Button>
                </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
            </Popover>
        </Fragment>
      </>
    )
  }

export default UserCard;