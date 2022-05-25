import '../Style/App.css';
import * as React from 'react';
import { Box, Text, Avatar, useColorModeValue } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import { api } from '../Features/routes';
import Loader from '../Components/Loader';
import AddAddressButton from '../Components/AddAddressButton'

function Profile() {

  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  const [registerYear, setRegisterYear] = useState('');
  const [registerMonth, setRegisterMonth] = useState('');
  const [numberOfOrders, setNumberOfOrders] = useState('');
  const [loading, setLoading] = useState(true);
  const themeColor = useColorModeValue('blue.500', 'blue.200')
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const getData = async () => {
        const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
         await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'openid'
        })
          api.getMonthAndYear(user.email, token).then((result) => {  
            // setRegisterDate([result.data.year, result.data.month])
            setRegisterYear(result.data.year)
            setRegisterMonth(result.data.month)
            api.getNumberOfOrders(user.email, token).then((result) => {   
              setNumberOfOrders(result.data.count)
              setLoading(false)
            })
          }) 
      }
      getData();
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading, user.email]);


  if (loading) {
    return <Loader />
  }


  return(
    <Box 
      display='flex'
      flexDirection='column'
    >
      <Box 
        className='profile'
        // border='1px solid'
        borderColor={themeColor}
        borderRadius='8px'
        display='flex'
        flexDirection='column'
        margin='6rem auto' 
        marginBottom='1rem'
        width='80%'
        padding='1rem'
        backgroundColor={backgroundColor}
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
      <AddAddressButton/>
    </Box>
  )
}

export default Profile;