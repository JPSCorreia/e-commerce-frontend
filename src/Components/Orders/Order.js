import '../../Style/App.css';
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
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      margin='1rem'
      width='80%'
      alignSelf='center'
      borderRadius='3px'
    >
      <Box 
        className='order-description'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        textAlign='left'
        margin='2rem'
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
        <NavLink
          to={`${props.order.id}`}
          className='products-page-link'
        >
          <Button 
            className='order-details-button' 
            colorScheme='blue'
          >
            Details
          </Button>
        </NavLink>
      </Box>
    </ListItem>
  )
}

export default Order;