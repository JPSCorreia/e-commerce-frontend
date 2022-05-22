import '../../Style/App.css';
import * as React from 'react';
import { Box, List, Heading } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { api } from '../../Features/routes';
import OrderItem from './OrderItem';
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../Loader';
import { useLocation } from 'react-router-dom';


function OrderDetailed(props) {
  const { getAccessTokenSilently } = useAuth0();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const allOrderItemsData = useSelector((state) => state.orderData.allOrderItemsData)
  const order = location.state? location.state : allOrderItemsData
  const orderDetailedDataIsLoading = useSelector((state) => state.orderData.allOrderItemsDataIsLoading)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT ? 'dev token' :
        await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'openid'
        })
      const orderObj = {
        token: token,
        id: id
      }
      // get all orders from the database and put them in an array
      await dispatch(api.orders.getAllOrderItems(orderObj))
      setLoaded(true)
    }
    if (!location.state) {
      getData();
    }
    if (location.state) {
      setLoaded(true)
    }
  }, []);

  // console.log(orderDetailedData)
  if (!loaded) return <Loader />

  return(
    <Box className='order-detailed-list'>
      <Heading>Order #{id} </Heading>
      <List>
      {order.map((orderItem, index) => (
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