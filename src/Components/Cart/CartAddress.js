import '../../Style/App.css';
import * as React from 'react';
import Address from '../Addresses/Address';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth0 } from "@auth0/auth0-react";
import { api } from '../../Features/routes';
import { Text, List, Box, ListItem, useColorModeValue } from '@chakra-ui/react'
import RemoveAddressButton from '../Addresses/RemoveAddressButton';
import EditAddressButton from '../Addresses/EditAddressButton';



function CartAddress(props) {

  // React/Redux State/Action Management.
  const dispatch = useDispatch();
  const addressesData = useSelector((state) => state.addressesData.data || [])
  const { user, getAccessTokenSilently } = useAuth0();
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');


  return(
    <Box 
      className='address-address'
    >
      <Box 
        id='1'
        className='address-item'
        display='flex'
        flexDirection='column'
        width='100%'
        margin='0 auto'
        marginTop='1.5rem'
        padding='1rem'
        borderColor={
          useColorModeValue('blue.500', 'blue.200')
        }
        borderRadius='8px'
        backgroundColor={backgroundColor}
      > 
        <Box
          display='flex'
          alignItems='baseline'
        >
          <Text 
            className='address-text' 
            fontSize='xl'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            Name:
          </Text>
          <Text 
            className='address-text'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            {props.address.full_name}
          </Text>
        </Box>
        <Box
          display='flex'
          alignItems='baseline'
        >
          <Text 
            className='address-text' 
            fontSize='xl'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            Phone Number:
          </Text>
          <Text 
            className='address-text'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            {props.address.phone_number}
          </Text>
        </Box>
        <Box
          display='flex'
          alignItems='baseline'
        >
          <Text 
            className='address-text' 
            fontSize='xl'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            Address:
          </Text>
          <Text 
            className='address-text'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            {props.address.street_address}
          </Text>
        </Box>
        <Box
          display='flex'
          alignItems='baseline'
        >
          <Text 
            className='address-text' 
            fontSize='xl'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            City:
          </Text>
          <Text 
            className='address-text'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            {props.address.city}
          </Text>
        </Box>
        <Box
          display='flex'
          alignItems='baseline'
        >
          <Text 
            className='address-text' 
            fontSize='xl'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            Country:
          </Text>
          <Text 
            className='address-text'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            {props.address.country}
          </Text>
        </Box>
        <Box
          display='flex'
          alignItems='baseline'
        >      
          <Text 
            className='address-text' 
            fontSize='xl'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            Postcode:
          </Text>
          <Text 
            className='address-text'
            margin='0 !important'
            marginTop='0.5rem !important'
            marginLeft='0.5rem !important'
          >
            {props.address.postcode}
          </Text>
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          // margin='0 auto'
          className='edit-remove-buttons'
          marginTop='0.75rem'
          marginRight='0.5rem'
          marginLeft='0.5rem'
          justifyContent='space-between'
        >
          <EditAddressButton 
            address={props.address}
          />
          <RemoveAddressButton 
            address={props.address}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default CartAddress;