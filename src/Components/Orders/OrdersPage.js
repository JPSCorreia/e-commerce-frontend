import '../../Style/App.css';
import * as React from 'react';
import OrderList from './OrderList';
import { NavLink } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import {ChevronRightIcon} from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { api } from '../../Features/routes';
import { useAuth0 } from "@auth0/auth0-react";

function OrdersPage() {

  const themeColor = useColorModeValue('blue.500', 'blue.200');
  const dispatch = useDispatch();
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getData = async () => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
       audience: process.env.REACT_APP_AUTH0_AUDIENCE,
       scope: 'openid'
     })
      await dispatch(api.orders.getAllOrders({
        token: token,
        email: user.email
      })) 
    }
    getData();
  }, []);

  return(
    <Box className='order-page' >
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
        <BreadcrumbItem isCurrentPage marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink color={themeColor}>
            Orders
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <OrderList />
    </Box>
  )
}

export default OrdersPage;