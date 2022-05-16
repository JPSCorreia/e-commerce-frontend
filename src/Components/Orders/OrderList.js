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
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orderData.data)
  const audience = "https://dev-ymfo-vr1.eu.auth0.com/api/v2/" 
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently({        
        audience: audience,
        scope: 'openid'
      })
      const orderObj = {
        token: token,
        email: user.email
      }
      dispatch(api.getAllOrders(orderObj)) 
      dispatch(setOrderListLoaded(true))
    }
    getData();
  }, [dispatch, getAccessTokenSilently, user.email]);

  return(
    <Box className='order-list'>
      <List>
        {orderData.data?.map((order, index) => (
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