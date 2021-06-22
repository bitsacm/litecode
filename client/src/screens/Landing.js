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
        fetch('http://localhost:3000/auth/google/',
                {   
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                if(res.data){
                    const url = res.data.googleLoginUrl
                    window.location.href = url;
                } else {
                    alert("ERROR RETRIEVING CONTENT.");
                }
            }))
    }

    return(
        <Flex
            flexDirection={["column", "column", "row", "row", "row"]}
            width="100%" 
            mt="30px" 
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex 
                flexDirection="column" 
                width={["100%", "100%", "50%", "50%", "50%"]} 
                height="500px"
                justifyContent="center"
            >
                
                <Heading
                    pt={["80px", "80px", "0px", "0px", "0px"]} 
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
                    color="white" 
                    bg="liteblue" 
                    mt="80px" 
                    fontSize="24px" 
                    width="250px" 
                    minHeight="50px" 
                    borderRadius="12px"
                    onClick={login}
                    _hover={{ bg: "#81C8DC" }}
                    _active={{
                        bg: "#81C8DC",
                        transform: "scale(0.98)",
                        borderColor: "liteblue",
                    }}
                >Create an account ;)</Button>
            </Flex>

            <Flex 
            width="50%"
            display={["none", "none", "flex", "flex", "flex"]} 
            justifyContent="center" 
            alignItems="center">
                <Image 
                ml="25px"
                mr="25px"
                boxSize={["350px", "350px", "450px", "450px", "450px"]}
                objectFit="cover" src={landingImg} />
            </Flex>
        </Flex>
    )
}

export default Landing;