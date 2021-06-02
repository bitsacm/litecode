import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { 
    HStack, 
    Heading,
    Text,
    Spacer,
    Button,
    Box,
    Flex
} from '@chakra-ui/react'

const Navbar = () => {
    // const authCtx = useContext(AuthContext);
    // const isLoggedIn = authCtx.isLoggedIn;
    const isLoggedIn = true;
    const hasRoom = false;
 
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
                    <Box 
                        height="50px" 
                        width="50px" 
                        bg="lite"
                        fontSize="36px"
                        color="liteg"
                        borderRadius="8px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        marginRight="15px"
                    >lc</Box>
                    <Heading color="liteg">litecode</Heading>
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
                >logout</Button> 
            </Fragment> :
            null}
        </Flex>
    )
}

export default Navbar;