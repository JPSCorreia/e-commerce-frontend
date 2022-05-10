import '../Style/App.css';
import * as React from 'react';
import { Heading, Box, Text } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {

  const { user } = useAuth0();

  return(
    <Box className='Dashboard'>
      <Heading>Dashboard</Heading>
      <Text>
        Welcome {user.nickname}
      </Text>
    </Box>
  )
}

export default Dashboard;