import '../../Style/App.css';
import * as React from 'react';
import { Box, Show, Text, Hide, ListItem, useColorModeValue, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { api } from '../../Features/routes';
import { useAuth0 } from "@auth0/auth0-react";
import { CgDetailsMore } from 'react-icons/cg'

function Order(props) {
  
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  
  const onClick = async () => {

    const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
    await getAccessTokenSilently({
     audience: process.env.REACT_APP_AUTH0_AUDIENCE,
     scope: 'openid'
   })
    const order = await dispatch(api.orders.getAllOrderItems({token, id: props.order.id})).unwrap()
    navigate(`${props.order.id}`, {state: order})
  }

  return(
    <ListItem 
      id={props.id}
      className='order'
      backgroundColor={backgroundColor}
      borderColor={
        useColorModeValue('blue.500', 'blue.200')
      }
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      margin='1rem auto'
      width={['90%','80%']}
      borderRadius='8px'
    >
      <Box 
        className='order-description'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        margin='1rem 1rem'
        width='90%'
        textAlign='left'
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
          Order:
        </Text>
        <Text 
          className='address-text'
          margin='0 !important'
          // marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
          fontSize={['sm', 'md']}
        >
          #{props.order.id}
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
          Total:
        </Text>
        <Text 
          className='address-text'
          margin='0 !important'
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
          fontSize={['sm', 'md']}
        >
          {props.order.total.toFixed(2).replace('.', ',')}€
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
          Status:
        </Text>
        <Text 
          className='address-text'
          margin='0 !important'
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
          fontSize={['sm', 'md']}
        >
          {props.order.status}
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
          Name:
        </Text>
        <Text 
          className='address-text'
          margin='0 !important'
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
          fontSize={['sm', 'md']}
        >
          {props.order.full_name}
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
          {props.order.phone_number}
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
          {props.order.street_address}
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
          {props.order.city}
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
          fontSize={['sm', 'md']}
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
        >
          {props.order.country}
        </Text>
        </Box>
        <Box
          display='flex'
          alignItems='baseline'
          marginBottom='0.25rem'
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
          fontSize={['sm', 'md']}
          margin='0 !important'
          marginTop='0.5rem !important'
          marginLeft='0.5rem !important'
        >
          {props.order.postcode}
        </Text>

      </Box>
        <Show breakpoint='(max-width: 750px)'>
        <Button 
            className='button' 
            colorScheme='blue'

            marginRight='1.5rem'
            alignSelf='flex-start'
            onClick={() => onClick()}
            rightIcon={<CgDetailsMore />}
            maxWidth='128px'
            marginTop='0.75rem'
          >
            Details
          </Button>
          </Show>
        </Box>
        
        <Hide breakpoint='(max-width: 750px)'>
          <Button 
            className='button' 
            colorScheme='blue'
            marginBottom='1.5rem'
            marginRight='1.5rem'
            alignSelf='flex-end'
            onClick={() => onClick()}
            rightIcon={<CgDetailsMore />}
            maxWidth='128px'
          >
            Details
          </Button>
        </Hide>
    </ListItem>
  )
}

export default Order;