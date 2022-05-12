import '../Style/App.css';
import * as React from 'react';
import { Box, ListItem, useColorModeValue, Button } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';

function Order(props) {

  return(
    <ListItem 
    id={props.id}
    className='order'
    border='1px solid'
    borderColor={
      useColorModeValue('blue.500', 'blue.200')
    }
    >
      <Box className='order-description'>
        <Box className='order-id'>
          Order #{props.order.id}
        </Box>
        <Box className='order-price'>Total: {props.order.total}€</Box>
        <Box className='order-status'>Status: {props.order.status}</Box>
        <NavLink
          to={`${props.order.id}`}
          className='products-page-link'
        >
        <Button className='order-details-button' colorScheme='blue'>Details</Button>
        </NavLink>
      </Box>
    </ListItem>
  )
}

export default Order;