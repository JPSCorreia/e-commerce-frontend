import '../../Style/App.css';
import * as React from 'react';
import OrderList from './OrderList';
import { Box, Heading } from '@chakra-ui/react'

function OrdersPage() {

  return(
    <Box className='order-page'>
      <Heading>Orders</Heading>
      <OrderList />
      
    </Box>
  )
}

export default OrdersPage;