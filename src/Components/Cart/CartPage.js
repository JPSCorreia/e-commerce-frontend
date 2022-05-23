import '../../Style/App.css';
import * as React from 'react';
import TotalCart from './TotalCart';
import CartList from './CartList';
import { NavLink } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { api } from '../../Features/routes';
import { useAuth0 } from "@auth0/auth0-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import {ChevronRightIcon} from '@chakra-ui/icons';


function CartPage() {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const themeColor = useColorModeValue('blue.500', 'blue.200');
  const numberOfCartItems = useSelector((state) => state.cartData.numberOfCartItems)

  useEffect(() => { 
    const getData = async () => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
       audience: process.env.REACT_APP_AUTH0_AUDIENCE,
       scope: 'openid'
     })
      await dispatch(api.cart.getCartProductsByEmail({token, email: user.email}))
      await dispatch(api.cart.getTotalPrice({user_email: user.email}))
    }
    getData();
    
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return(
    <Box 
      className='cart-page'
      display='flex'
      justifyContent='center'
      flexDirection='column'
      padding='0'
    >
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
            Cart {((numberOfCartItems === 0) || (!numberOfCartItems)) && '(empty)'} {(Number(numberOfCartItems) === 1) && `(${numberOfCartItems} item)`} {(numberOfCartItems > 1) && `(${numberOfCartItems} items)`}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <CartList /> 
      <TotalCart />
    </Box>
  )
}

export default CartPage;