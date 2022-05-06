import '../Style/App.css';
import * as React from 'react';
import { Heading, Box, Text } from '@chakra-ui/react'

function Home() {

  return(
    <Box className='Home'>
      <Heading>Home</Heading>
      <Text>
        You are not logged in
      </Text>
    </Box>
  )
}

export default Home;