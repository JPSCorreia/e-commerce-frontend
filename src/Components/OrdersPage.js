import '../Style/App.css';
import * as React from 'react';
import { Heading } from '@chakra-ui/react'
import OrderList from './OrderList';

function OrdersPage() {

  return(
    <div className='order-page center'>
      <Heading>Orders</Heading>
      <OrderList />
    </div>
  )
}

export default OrdersPage;