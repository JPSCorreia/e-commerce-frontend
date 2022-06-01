import '../Style/App.css';
import * as React from 'react';
import { Box, Text, Avatar, useColorModeValue } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../Features/routes';
import Loader from '../Components/Loader';
import AddAddressButton from './Addresses/AddAddressButton'
import AddressList from './Addresses/AddressList';

function Profile() {

  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  const addressesData = useSelector((state) => state.addressesData.data || [])
  const month = useSelector((state) => state.userData.month)
  const year = useSelector((state) => state.userData.year)
  const numberOfOrders = useSelector((state) => state.orderData.numberOfOrders)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const getData = async () => {
        const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
         await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'openid'
        })
        await dispatch(api.users.getMonthAndYear({user_email: user.email, token }))
        await dispatch(api.orders.getNumberOfOrders({user_email: user.email, token}))
        setLoading(false)
      }
      getData();
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading, user.email, dispatch]);


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
             {`${month}, ${year}`}
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
      <AddressList />
      { (addressesData.length < 1)?
        <AddAddressButton width='80%' /> : ''}
    </Box>
  )
}

export default Profile;