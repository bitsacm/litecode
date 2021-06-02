import React, { Fragment } from 'react'
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

const Login = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return(
        <Fragment>
            <Flex paddingTop="150px" flexDirection="column" width="40%">
                <Heading>Login to your Litecode account.</Heading>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>

                <InputGroup size="md">
                    <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                    </InputRightElement>
                </InputGroup>
                <Button>Login</Button>
                <Link to="/signup">
                    <Text>Don't have an account? Click here to signup.</Text>
                </Link>
            </Flex>
      </Fragment>
    )
}

export default Login;