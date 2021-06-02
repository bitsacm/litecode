import React, { Fragment } from 'react'
import { Box } from '@chakra-ui/react'

import Navbar from './Navbar'

const Layout = (props) => {
    return (
      <Box margin="30px">
        <Navbar />
        <main>{props.children}</main>
      </Box>
    );
  };
  
export default Layout;