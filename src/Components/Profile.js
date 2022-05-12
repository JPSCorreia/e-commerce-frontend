import '../Style/App.css';
import * as React from 'react';
import { Box, Text, Avatar, useColorModeValue } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import { api } from '../Features/routes';

function Profile() {

  const { isAuthenticated, isLoading, user } = useAuth0();
  const [registerYear, setRegisterYear] = useState('');
  const [registerMonth, setRegisterMonth] = useState('');
  const [numberOfOrders, setNumberOfOrders] = useState('');

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      api.getMonthAndYear(user.email).then((result) => {   
          setRegisterYear(result.data.year)
          setRegisterMonth(result.data.month)
      })
      api.getNumberOfOrders(user.email).then((result) => {   
        setNumberOfOrders(result.data.count)
    })
    }
  }, []);

  return(
    <Box 
    className='profile'
    border='1px solid'
    borderColor={
      useColorModeValue('blue.500', 'blue.200')
    }
    >
      
      <Avatar  className='profile-page-avatar' src={user.picture} alt={user.name} />
      <Text fontSize='3xl'>
        {user.nickname}
      </Text>
      <Box className='profile-box'>
        <Box className='profile-text-row'>
          <Text className='profile-text' fontSize='xl'>
            Email:
          </Text>
          <Text className='profile-text'>
            {user.email}
          </Text>
        </Box>
        <Box className='profile-text-row'>
          <Text className='profile-text' fontSize='xl'>
            Joined:
          </Text>
          <Text className='profile-text'>
           {`${registerMonth}, ${registerYear}`}
          </Text>
        </Box>
        <Box className='profile-text-row'>
        <Text className='profile-text' fontSize='xl'>
          Orders placed: 
        </Text>
        {/* //TODO: add orders placed here */}
        <Text className='profile-text'>
        {numberOfOrders}
        </Text>
        </Box>
      </Box>

    </Box>
  )
}

export default Profile;