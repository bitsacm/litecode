import React, { Fragment } from 'react'

import {
    Heading,
    Text,
    Image,
    Flex,
    Box,
    Button
} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"

  import { useDisclosure } from "@chakra-ui/react"

  import UserCardSm from './UserCardSm'

const RoomCard = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                                src={member.imgUrl} 
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
                    onClick={onOpen}
                >Join</Button>

                <Modal m="10px" isOpen={isOpen} size="xl" onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader
                            mt="10px"
                            fontSize="28px"
                            color="litegrey.600"
                        >{props.room.name}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text 
                                mt="-25px"
                                fontSize="20px"
                                fontWeight="medium"
                                color="litegrey.400"
                            >There’s 4 members here</Text>
                            <Flex flexDirection="row" mt=" 20px" justifyContent="space-between">
                                <Flex flexDirection="column" width="60%">
                                    {(props.room.members.map((member, id) => (
                                        <UserCardSm member={member} />
                                    )))}
                                </Flex>
                                <Flex flexDirection="column" width="40%">
                                <Text
                                fontSize="25px"
                                color="litegrey.400"
                                >You Pay</Text>
                                <Heading
                                mt="-5px"
                                fontSize="34px"
                                color="litegrey.600"
                                mb="30px"
                                >₹ {props.room.price}</Heading>
                                <Button bg="liteblue" width="150px" borderRadius="10" color="white" onClick={onClose}>
                                    Join Group
                                    </Button>
                                </Flex>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Flex>
           
        </Fragment>
    )
}

export default RoomCard;