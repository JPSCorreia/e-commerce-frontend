import '../Style/App.css';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Heading, Box, Text } from '@chakra-ui/react'

function Dashboard() {

  const username = useSelector((state) => state.isAuthenticated.username)

  return(
    <Box className='Dashboard'>
      <Heading>Dashboard</Heading>
      <Text>
        Welcome {username}
      </Text>
    </Box>
  )
}

export default Dashboard;