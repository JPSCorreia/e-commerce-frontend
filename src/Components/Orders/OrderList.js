import '../../Style/App.css';
import * as React from 'react';
import { Box, List } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import Order from './Order';


function OrderList() {

  // React/Redux State/Action Management.
  const orderData = useSelector((state) => state.orderData.allOrdersData)

  return(
    <Box className='order-list'>
      <List>
        {orderData?.map((order, index) => (
          <Order 
            order={order}
            key={index}
            id={`order-${index+1}`}
          />
        ))}
      </List>
    </Box>
  )
}

export default OrderList;