import React, { Fragment, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
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
import acmlogo from '../resources/img/acmlogo.png'
import logoutpng from '../resources/img/logout.png'

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
                <NavLink activeClassName="activeLink" to="/room">
                    <Text
                        fontSize="22px"
                        color="litegrey.400"
                        fontWeight="medium"
                        marginRight="25px"
                    >My Room</Text>
                </NavLink>

                <NavLink activeClassName="activeLink" to="/allrooms">
                    <Text
                        fontSize="22px"
                        color="litegrey.400"
                        fontWeight="medium"
                        marginRight="25px"
                    >All Rooms</Text>
                </NavLink>

                <Image 
                    height="40px"
                    width="40px"
                    objectFit="cover"
                    src={logoutpng}
                    padding="6px"
                    opacity="0.2"
                    onClick={logout}
                />
            </Fragment> :
            <Image 
                height="40px"
                objectFit="cover"
                src={acmlogo}
            />}
        </Flex>
    )
}

export default Navbar;