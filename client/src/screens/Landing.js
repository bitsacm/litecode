import React, { Fragment } from 'react'
import { 
    HStack, 
    Heading,
    Text,
    Spacer,
    Button,
    Box,
    Flex
} from '@chakra-ui/react'
import {
    Link
} from 'react-router-dom'

const Landing = () => {
    return(
        <Flex position="fixed">
            <Flex width="65%" paddingLeft="20px" height="580px" flexDirection="column" alignContent="center" justifyContent="center">
                <Heading
                    fontSize="48px"
                    color="liteg"
                    lineHeight="1"
                    paddingBottom="15px"
                >Share Leetcode premium accounts.</Heading>
                <Text
                    fontSize="26px"
                    color="#535353"
                    fontWeight="medium"
                    lineHeight="1.2"
                    paddingBottom="35px"
                >Create an account. We match you with a room of similar individuals.</Text>
                <Link to="/login">
                    <Button
                    width="200px"
                    height="50px"
                    fontSize="28px"
                    color="liteg"
                    bg="lite"
                    borderRadius="50px"
                >Get Started</Button>
                </Link>
            </Flex>
            <Box 
                width="1200px" 
                height="1200px" 
                borderRadius="150%" 
                bg="lite" 
                position="absolute" 
                overflowX="hidden"
                zIndex="-2"
                marginLeft="100%"
                marginTop="-40%"
            ></Box>
        </Flex>
    )
}

export default Landing;