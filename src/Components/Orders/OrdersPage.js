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


function OrdersPage() {

  const themeColor = useColorModeValue('blue.500', 'blue.200');


  return(
    <Box className='order-page' >
      <Breadcrumb  
        display='flex' 
        width='80%' 
        margin='0.5rem auto'
        paddingTop='0.25rem'
        separator={<ChevronRightIcon color='gray.500' />}
        className='breadcrumb'
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