import '../../Style/App.css';
import * as React from 'react';
import { Box, List, Heading } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { api } from '../../Features/routes';
import OrderItem from './OrderItem';
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function OrderDetailed() {

  // React/Redux State/Action Management.
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const { id }  = useParams();
  const orderDetailedData = useSelector((state) => state.orderData.allOrderItemsData)

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently({        
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: 'openid'
      })
      const orderObj = {
        token: token,
        id: id
      }
      // get all orders from the database and put them in an array
      dispatch(api.orders.getAllOrderItems(orderObj))
    }
    getData();
  }, [dispatch, id, getAccessTokenSilently]);

  return(
    <Box className='order-detailed-list'>
      <Heading>Order #{id} </Heading>
      <List>
      {orderDetailedData?.data?.map((orderItem, index) => (
        <OrderItem
          orderItem={orderItem}
          key={index}
          id={`order-item-${index+1}`}
        />
      ))}
      </List>
    </Box>
  )
}

export default OrderDetailed;