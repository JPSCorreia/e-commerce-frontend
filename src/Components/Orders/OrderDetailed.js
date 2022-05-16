import '../../Style/App.css';
import * as React from 'react';
import { Box, List, Heading } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetailedListLoaded } from '../../Features/loadedComponentsSlice';
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
  const audience = "https://dev-ymfo-vr1.eu.auth0.com/api/v2/"
  const orderDetailedData = useSelector((state) => state.orderData.itemData)

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently({        
        audience: audience,
        scope: 'openid'
      })
      const orderObj = {
        token: token,
        id: id
      }
      // get all orders from the database and put them in an array
      dispatch(api.getAllOrderItems(orderObj))
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