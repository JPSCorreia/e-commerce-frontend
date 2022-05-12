import '../Style/App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { api } from '../Features/routes';
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
      <Box className='order-item-description'>
        <Box className='order-item-name'>
          {props.orderItem.id}
        </Box>
        <Box className='order-item-price'>Price: €</Box>
      </Box>
      {/* <Image
        className='order-item-preview'
        alt={`${props.orderItem.image_link}`}
        src={`images/${props.orderItem.image_link}.jpg`}
      /> */}
    </ListItem>
  )
}

export default OrderItem;