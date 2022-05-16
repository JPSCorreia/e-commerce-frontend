import '../Style/App.css';
import * as React from 'react';
import { Box, Text, Avatar, useColorModeValue } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import { api } from '../Features/routes';

function Profile() {

   const audience = "https://dev-ymfo-vr1.eu.auth0.com/api/v2/" 
  // const scope = "read:current_user";

  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  const [registerYear, setRegisterYear] = useState('');
  const [registerMonth, setRegisterMonth] = useState('');
  const [numberOfOrders, setNumberOfOrders] = useState('');

  // const [registerDate, setRegisterDate] = useState(['',''])

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const getData = async () => {
        const token = await getAccessTokenSilently({
          audience: audience,
          scope: 'openid'
        })
        console.log(token)
          api.protectedGetMonthAndYear(user.email, token).then((result) => {  
            // setRegisterDate([result.data.year, result.data.month])
            setRegisterYear(result.data.year)
            setRegisterMonth(result.data.month)
            
          }) 
      }
      getData();
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading, user.email]);



  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      api.getNumberOfOrders(user.email).then((result) => {   
        setNumberOfOrders(result.data.count)
      })
    }
  }, [isAuthenticated, isLoading, user.email]);



  return(
    <Box 
      className='profile'
      border='1px solid'
      borderColor={
        useColorModeValue('blue.500', 'blue.200')
      }
      borderRadius='3px'
      display='flex'
      flexDirection='column'
      margin='6rem auto' 
      width='50%'
      padding='1rem'
    >
      
      <Avatar  
        className='profile-page-avatar' 
        src={user.picture} 
        alt={user.name} 
        margin='0 auto'
      />
      <Text 
        fontSize='3xl'
      >
        {user.nickname}
      </Text>
      <Box 
        className='profile-box'
        display='flex'
        flexDirection='column'
        marginTop='0.5rem'
        justifyContent='flex-start'
        textAlign='left'
      >
        <Box 
          className='profile-text-row'
          display='flex'
          flexDirection='row'
          alignItems='baseline'
          margin='0'
        >
          <Text 
            className='profile-text' 
            fontSize='xl'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            Email:
          </Text>
          <Text 
            className='profile-text'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            {user.email}
          </Text>
        </Box>
        <Box 
          className='profile-text-row'
          display='flex'
          flexDirection='row'
          alignItems='baseline'
          margin='0'
        >
          <Text 
            className='profile-text' 
            fontSize='xl'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            Joined:
          </Text>
          <Text 
            className='profile-text'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
           {`${registerMonth}, ${registerYear}`}
          </Text>
        </Box>
        <Box 
          className='profile-text-row'
          display='flex'
          flexDirection='row'
          alignItems='baseline'
          margin='0'
        >
        <Text 
          className='profile-text' 
          fontSize='xl'
          margin='0 !important'
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
        >
          Orders placed: 
        </Text>
        {/* //TODO: add orders placed here */}
        <Text 
          className='profile-text'
          margin='0 !important'
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
        >
        {numberOfOrders}
        </Text>
        </Box>
      </Box>

    </Box>
  )
}

export default Profile;