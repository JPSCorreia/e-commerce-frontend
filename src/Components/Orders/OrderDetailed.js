import '../../Style/App.css';
import * as React from 'react';
import { Box, List, useColorModeValue } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { api } from '../../Features/routes';
import OrderItem from './OrderItem';
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../Loader';
import { useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import {ChevronRightIcon} from '@chakra-ui/icons';


function OrderDetailed(props) {
  const { getAccessTokenSilently } = useAuth0();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const allOrderItemsData = useSelector((state) => state.orderData.allOrderItemsData)
  const order = location.state? location.state : allOrderItemsData
  const toast = useToast()
  const addOrderToastDisplayed = useSelector((state) => state.orderData.addOrderToastDisplayed)
  const [loaded, setLoaded] = useState(false);
  const themeColor = useColorModeValue('blue.500', 'blue.200');

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (location.state && !addOrderToastDisplayed) {
      toast({
        title: 'Order Placed',
        description: "Your order was placed successfully",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      dispatch(api.orders.setAddOrderToastDisplayed(true))
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!loaded) return <Loader />

  return(
    <Box className='order-detailed-list'>
      <Breadcrumb  
        display='flex' 
        width={['90%','80%']}
        margin='0.5rem auto'
        paddingTop='0.25rem'
        separator={<ChevronRightIcon color='gray.500' />}
        className='breadcrumb'
        fontSize={['sm', 'md']}
      >
        <BreadcrumbItem  marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink  as={NavLink} to='/'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem >
        <BreadcrumbItem  marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink as={NavLink} to='/orders'>
            Orders
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink color={themeColor}>
            Order #{id}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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