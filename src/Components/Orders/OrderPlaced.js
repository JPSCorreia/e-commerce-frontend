import '../../Style/App.css';
import * as React from 'react';
import { Box, Heading } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function OrderPlaced() {

  const toast = useToast()
  let location = useLocation();

  console.log(location)

  useEffect(() => {
    toast({
      title: 'Order Placed',
      description: "Your order was placed successfully",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }, [])

  return(
    <Box className='order-placed'>
      <Heading>Order Placed</Heading>
    </Box>
  )
}

export default OrderPlaced;