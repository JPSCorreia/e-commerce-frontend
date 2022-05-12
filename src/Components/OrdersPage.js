import '../Style/App.css';
import * as React from 'react';
import OrderList from './OrderList';
import { Box } from '@chakra-ui/react'

function OrdersPage() {

  return(
    <Box className='order-page'>
      <OrderList />
    </Box>
  )
}

export default OrdersPage;