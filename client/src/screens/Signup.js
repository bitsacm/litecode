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

const Signup = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return(
        <Fragment>
            <Flex paddingTop="150px" flexDirection="column" width="40%">
                <Heading>Sign Up for Litecode.</Heading>
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
                <Button>Signup</Button>
                <Link to="/login">
                    <Text>Already have an account? Click here to login!</Text>
                </Link>
            </Flex>
      </Fragment>
    )
}

export default Signup;