import React, { Fragment, useContext } from 'react'
import { 
    HStack, 
    Heading,
    Text,
    Spacer,
    Button,
    Image,
    Box,
    Flex
} from '@chakra-ui/react'

import {
    Link
} from 'react-router-dom'
import AuthContext from '../store/auth'

import landingImg from '../resources/img/landing.png'
import landingImg1 from '../resources/img/landingImg1.jpg'
import landingImg2 from '../resources/img/landingImg2.jpg'
import landingImg3 from '../resources/img/landingImg3.jpg'
import landingImg4 from '../resources/img/landingImg4.jpg'
import landingImg5 from '../resources/img/landingImg5.png'

const Landing = () => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const login = () => {
        authCtx.login("dummy")
    }

    return(
        <Flex 
            flexDirection="row" 
            width="100%" 
            mt="30px" 
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex 
                flexDirection="column" 
                width="50%" 
                height="500px"
                justifyContent="center"
            >
                
                <Heading
                    fontSize="44px"
                    color="litegrey.600"
                >Share Leetcode</Heading>

                <Heading
                    mt="-5px"
                    fontSize="44px"
                    color="litegrey.600"
                >premium accounts.</Heading>

                <Text
                    mt="10px"
                    color="litegrey.400"
                    fontSize="24px"
                    fontWeight="medium"
                >Discover people willing to split the cost for LeetCode Premium accounts with you.</Text>
                
                <Flex flexDirection="row" mt="30px" mb="20px" alignItems="center">
                    <Image boxSize="50px" borderRadius="100%" objectFit="cover" ml="0px" border="2px" borderColor="liteblue" src={landingImg1} />
                    <Image boxSize="50px" borderRadius="100%" objectFit="cover" ml="-10px" border="2px" borderColor="liteblue" src={landingImg2} />
                    <Image boxSize="50px" borderRadius="100%" objectFit="cover" ml="-10px" border="2px" borderColor="liteblue" src={landingImg3} />
                    <Image boxSize="50px" borderRadius="100%" objectFit="cover" ml="-10px" border="2px" borderColor="liteblue" src={landingImg4} />
                    <Text mr="20px" ml="20px">+</Text>
                    <Image boxSize="50px" borderRadius="100%" objectFit="cover" border="2px" borderColor="litegold" src={landingImg5} />
                </Flex>
                
                <Button 
                    bg="liteblue" 
                    mt="20px" 
                    fontSize="24px" 
                    color="white" 
                    width="250px" 
                    height="50px" 
                    borderRadius="12px"
                    onClick={login}
                >Create an account ;)</Button>
            </Flex>

            <Flex width="50%" justifyContent="center" alignItems="center">
                <Image boxSize="450px" src={landingImg} />
            </Flex>
        </Flex>
    )
}

export default Landing;