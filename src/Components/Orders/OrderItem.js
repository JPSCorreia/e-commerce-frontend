import '../../Style/App.css';
import * as React from 'react';

import { Box, Image, ListItem, useColorModeValue } from '@chakra-ui/react'

function OrderItem(props) {


  // React/Redux State/Action Management.
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  
  return(
    <ListItem 
      id={props.id}
      className='order-item'
      // border='1px solid'
      display='flex'
      justifyContent='space-between'
      width='80%'
      margin='1rem auto'
      borderColor={
        useColorModeValue('blue.500', 'blue.200')
      }
      borderRadius='8px'
      backgroundColor={backgroundColor}
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
          Total: {((props.orderItem.price -(props.orderItem.price * props.orderItem.discount/100)) * props.orderItem.quantity).toFixed(2).replace('.', ',')}€
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