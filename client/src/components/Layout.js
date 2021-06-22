import React, { Fragment } from 'react'
import { Box } from '@chakra-ui/react'

import Navbar from './Navbar'

const Layout = (props) => {
    return (
      <Box mt="30px" mb="30px" 
        mr={["30px", "30px", "120px", "120px", "120px"]} 
        ml={["30px", "30px", "120px", "120px", "120px"]} 
      >
        <Navbar />
        <main>{props.children}</main>
      </Box>
    );
  };
  
export default Layout;