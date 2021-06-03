import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
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

import AuthContext from '../store/auth'
import imgurl from '../resources/img/keyboard.png'

const Navbar = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logout = () => {
        authCtx.logout()
    }

    const login = () => {
        authCtx.login("dummy")
    }
 
    return(
        <Flex 
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
        >
            <Link to="/">
                <Flex 
                    flexDirection="row" 
                    alignItems="center"
                    justifyContent="center">
                    <Image boxSize="50px" src={imgurl} mr="8px"/>
                    <Heading fontSize="32px" color="liteblue">litecode</Heading>
                </Flex>
            </Link>

            <Spacer />

            {isLoggedIn ? 
            <Fragment>
                <Link to="/room">
                    <Text
                        fontSize="24px"
                        color="liteg"
                        marginRight="25px"
                    >my room</Text>
                </Link>

                <Link to="/allrooms">
                    <Text
                        fontSize="24px"
                        color="liteg"
                        marginRight="25px"
                    >all rooms</Text>
                </Link>

                <Link to="/profile">
                    <Text
                        fontSize="24px"
                        color="liteg"
                        marginRight="25px"
                    >profile</Text>
                </Link>

                <Button
                    bg="lite"
                    borderRadius="20px"
                    fontSize="24px"
                    onClick={logout}
                >logout</Button> 
            </Fragment> :
            null}
        </Flex>
    )
}

export default Navbar;