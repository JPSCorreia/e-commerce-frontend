import '../../Style/App.css';
import * as React from 'react';
import { Box, List } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { setOrderListLoaded } from '../../Features/loadedComponentsSlice';
import { useEffect, useState } from 'react';
import { api } from '../../Features/routes';
import Order from './Order';
import { useAuth0 } from "@auth0/auth0-react";

function OrderList() {

  // React/Redux State/Action Management.
  const [orderListData, setOrderListData] = useState([]);
  const dispatch = useDispatch();
  const orderListLoaded = useSelector((state) => state.loadedComponents.orderList)
  const { user } = useAuth0();

  useEffect(() => {
    const loadData = () => {
      // get all orders from the database and put them in an array
      console.log(user.email)
      api.getAllOrders(user.email).then((result) => {
        dispatch(setOrderListLoaded(true))
        const list = result.data?.map((order, index) => (
          <Order 
            order={order}
            key={index}
            id={`order-${index+1}`}
          />
        ))
        setOrderListData(list);
      })
    }
    loadData();
  }, [dispatch, orderListLoaded, user.email]);

  return(
    <Box className='order-list'>
      <List>
       {orderListLoaded && orderListData}
      </List>
    </Box>
  )
}

export default OrderList;