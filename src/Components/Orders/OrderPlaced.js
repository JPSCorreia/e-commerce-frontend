import '../../Style/App.css';
import * as React from 'react';
import { Box, Heading } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../Features/routes';
import { useDispatch, useSelector } from 'react-redux';

function OrderPlaced() {

  const toast = useToast()
  const location = useLocation();
  const dispatch = useDispatch();
  const addOrderToastDisplayed = useSelector((state) => state.orderData.addOrderToastDisplayed)

  useEffect(() => {
  if (location.state && !addOrderToastDisplayed) {
    toast({
      title: 'Order Placed',
      description: "Your order was placed successfully",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    dispatch(api.orders.setAddOrderToastDisplayed(true))
  }
}, []); // eslint-disable-line react-hooks/exhaustive-deps


  return(
    <Box className='order-placed'>
      <Heading>Order Placed</Heading>
    </Box>
  )
}

export default OrderPlaced;