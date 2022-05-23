import '../../Style/App.css';
import * as React from 'react';
import { Box, ListItem, useColorModeValue, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { api } from '../../Features/routes';
import { useAuth0 } from "@auth0/auth0-react";
import { CgDetailsMore } from 'react-icons/cg'

function Order(props) {
  
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backgroundColor = useColorModeValue('gray.100', 'gray.700');
  
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
      // border='1px solid'
      backgroundColor={backgroundColor}
      borderColor={
        useColorModeValue('blue.500', 'blue.200')
      }
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      margin='1rem'
      width='80%'
      alignSelf='center'
      borderRadius='8px'
    >
      <Box 
        className='order-description'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        textAlign='left'
        margin='1.25rem 2rem'
      >
        <Box 
          className='order-id'
        >
          Order #{props.order.id}
        </Box>
        <Box 
          className='order-price'
          marginTop='1rem'
          >
            Total: {props.order.total}€
        </Box>
        <Box 
          className='order-status'
          marginTop='1rem'
          marginBottom='1rem'
        >
          Status: {props.order.status}
        </Box>
          <Button 
            className='button' 
            colorScheme='blue'
            onClick={() => onClick()}
            rightIcon={<CgDetailsMore />}
          >
            Details
          </Button>
      </Box>
    </ListItem>
  )
}

export default Order;