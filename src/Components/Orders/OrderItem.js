import '../../Style/App.css';
import * as React from 'react';

import { Box, Image, ListItem, useColorModeValue } from '@chakra-ui/react'

function OrderItem(props) {

  // React/Redux State/Action Management.

  //TODO: add go back button to return to orders
  
  return(
    <ListItem 
      id={props.id}
      className='order-item'
      border='1px solid'
      borderColor={
        useColorModeValue('blue.500', 'blue.200')
      }
    >
      <Box 
        className='product-description'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        textAlign='left'
        margin='2rem'
      >
        <Box 
          className='product-name'
        >
          {props.orderItem.name} - {props.orderItem.description} 
        </Box>
        <Box 
          className='product-price'
          marginTop='1rem'
          marginBottom='1rem'
        >
          Total Price: {(props.orderItem.price * props.orderItem.quantity)}€
        </Box>
        <Box 
          className='product-quantity'
          marginBottom='1rem'
        >
          Quantity: {props.orderItem.quantity}
        </Box>
      </Box>
      <Image
        className='product-image-preview'
        alt={`${props.orderItem.image_link}`}
        src={`/images/${props.orderItem.image_link}.jpg`}
        display='inline-block'
        maxWidth='230px'
        maxHeight='95px'
        width='auto'
        height='auto'
        margin='2rem'
      />
    </ListItem>
  )
}

export default OrderItem;