import '../../Style/App.css';
import * as React from 'react';
import { Box, List, Heading } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetailedListLoaded } from '../../Features/loadedComponentsSlice';
import { useEffect, useState } from 'react';
import { api } from '../../Features/routes';
import OrderItem from './OrderItem';
import { useParams } from "react-router-dom";

function OrderDetailed() {

  // React/Redux State/Action Management.
  const [orderDetailedListData, setOrderDetailedListData] = useState([]);
  const dispatch = useDispatch();
  const orderDetailedListLoaded = useSelector((state) => state.loadedComponents.orderDetailedList)
  const { id }  = useParams();

  useEffect(() => {
    const loadData = () => {
      // get all orders from the database and put them in an array
      api.getAllOrderItems(id).then((result) => {
        dispatch(setOrderDetailedListLoaded(true))
        const list = result.data?.map((orderItem, index) => (
          <OrderItem
            orderItem={orderItem}
            key={index}
            id={`order-item-${index+1}`}
          />
        ))
        setOrderDetailedListData(list);
      })
    }
    loadData();
  }, [dispatch, orderDetailedListLoaded, id]);

  return(
    
    <Box className='order-detailed-list'>
      <Heading>Order #{id} </Heading>
      <List>
       {orderDetailedListLoaded && orderDetailedListData}
      </List>
    </Box>
  )
}

export default OrderDetailed;