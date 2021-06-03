import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { 
    FormControl, 
    FormLabel,
    Input,
    FormHelperText,
    Button,
    InputGroup,
    InputRightElement,
    Flex,
    Text,
    Heading,
} from '@chakra-ui/react'

import AuthContext from '../store/auth'

const Login = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logout = () => {
        authCtx.logout()
    }

    const login = () => {
        authCtx.login("dummy")
    }

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return(
        <Fragment>
            <Flex paddingTop="150px" flexDirection="column" width={["80%", "50%"]}>
                <Heading>Login to your Litecode account.</Heading>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                    <FormHelperText>Create an account using your BITS email ID.</FormHelperText>
                </FormControl>

                <InputGroup size="md">
                    <Input
                    pr="4.5rem"
                    type={show ? "text=" : "password"}
                    placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                    </InputRightElement>
                </InputGroup>
                <Button onClick={login}>Login</Button>
                <Link to="/signup">
                    <Text>Don't have an account? Click here to signup.</Text>
                </Link>
            </Flex>
      </Fragment>
    )
}

export default Login;