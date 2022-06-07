import '../../Style/App.css';
import * as React from 'react';
import { Text, Box, ListItem, useColorModeValue } from '@chakra-ui/react'
import RemoveAddressButton from './RemoveAddressButton';
import EditAddressButton from './EditAddressButton';


function Address(props) {

  // React/Redux State/Action Management.
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  
  return(
    <ListItem 
      id={props.id}
      className='address-item'
      display='flex'
      flexDirection='column'
      width={['90%','80%']}
      margin='0.5rem auto'
      borderColor={
        useColorModeValue('blue.500', 'blue.200')
      }
      borderRadius='8px'
      backgroundColor={backgroundColor}
    >
      <Box 
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        margin='1rem 1rem'
      >
      <Box
        display='flex'
        alignItems='baseline'
      >
        <Text 
          className='address-text' 
          fontSize={['sm', 'xl']}
          margin='0 !important'
          // marginTop='0.5rem !important'
        >
          Name:
        </Text>
        <Text 
          className='address-text'
          margin='0 !important'
          // marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
          fontSize={['sm', 'md']}
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
          fontSize={['sm', 'xl']}
          margin='0 !important'
          marginTop='0.5rem !important'
        >
          Phone Number:
        </Text>
        <Text 
          className='address-text'
          margin='0 !important'
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
          fontSize={['sm', 'md']}
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
          fontSize={['sm', 'xl']}
          margin='0 !important'
          marginTop='0.5rem !important'
        >
          Address:
        </Text>
        <Text 
          className='address-text'
          margin='0 !important'
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
          fontSize={['sm', 'md']}
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
          fontSize={['sm', 'xl']}
          margin='0 !important'
          marginTop='0.5rem !important'
        >
          City:
        </Text>
        <Text 
          className='address-text'
          margin='0 !important'
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
          fontSize={['sm', 'md']}
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
          fontSize={['sm', 'xl']}
          margin='0 !important'
          marginTop='0.5rem !important'
        >
          Country:
        </Text>
        <Text 
          className='address-text'
          margin='0 !important'
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
          fontSize={['sm', 'md']}
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
          fontSize={['sm', 'xl']}
          margin='0 !important'
          marginTop='0.5rem !important'
        >
          Postcode:
        </Text>
        <Text 
          className='address-text'
          margin='0 !important'
          fontSize={['sm', 'md']}
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
        >
          {props.address.postcode}
        </Text>
      </Box>
      <Box
        display='flex'
        flexDirection={['column','row']}
        className='edit-remove-buttons'
        marginTop='0.75rem'
        marginRight='0.5rem'
        justifyContent='space-between'
        alignItems={['baseline', '']}
      >
        <EditAddressButton 
          address={props.address}
        />
        <RemoveAddressButton 
          address={props.address}
          
        />
      </Box>
      </Box>
    </ListItem>
  )
}

export default Address;