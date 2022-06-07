import '../../Style/App.css';
import * as React from 'react';

import { Box, Hide, Show, Image, ListItem, useColorModeValue } from '@chakra-ui/react'

function OrderItem(props) {


  // React/Redux State/Action Management.
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  
  return(
    <ListItem 
      id={props.id}
      className='order-item'
      display='flex'
      justifyContent='space-between'
      width={['90%','80%']}
      margin='1rem auto'
      // alignItems='center'
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
        margin='1.25rem 1rem'
        width={['95%','95%','50%']}
      >
        <Box 
          className='product-name'
          fontSize={['sm', 'md']}
        >
          {props.orderItem.name}
        </Box>
        <Box 
          className='product-name'
          marginTop='1rem'
          fontSize={['sm', 'md']}
        >
          {props.orderItem.description} 
        </Box>
        <Show breakpoint='(max-width: 650px)'>
          <Box
            h='216px'
            w="288px"
            margin='0 auto'
            marginTop='1rem'
            rounded="lg"
            bgSize="cover"
            bgPos="center"
            style={{
              backgroundImage:
                `url(/images/${props.orderItem.image_link}.png`
            }}
          >
          </Box>
          </Show>
        <Box 
          className='product-price'
          marginTop='1rem'
          marginBottom='1rem'
          fontSize={['sm', 'md']}
        >
          Total: {((props.orderItem.price -(props.orderItem.price * props.orderItem.discount/100)) * props.orderItem.quantity).toFixed(2).replace('.', ',')}€
        </Box>
        <Box 
          className='product-quantity'
          // marginBottom='1rem'
          fontSize={['sm', 'md']}
        >
          Quantity: {props.orderItem.quantity}
        </Box>
      </Box>
      <Hide breakpoint='(max-width: 650px)'>
      <Box
        h='216px'
        w="288px"
        marginRight='1.25rem'
        marginTop='1.25rem'
        marginBottom='1.25rem'
        rounded="lg"
        bgSize="cover"
        bgPos="center"
        style={{
          backgroundImage:
            `url(/images/${props.orderItem.image_link}.png`
        }}
      >
      </Box>
      </Hide>
    </ListItem>
  )
}

export default OrderItem;