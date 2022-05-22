import '../../Style/App.css';
import * as React from 'react';
import TotalCart from './TotalCart';
import ItemTotal from './ItemTotal';
import CartList from './CartList';
import { Box } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { api } from '../../Features/routes';
import { useAuth0 } from "@auth0/auth0-react";

function CartPage() {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

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
      <ItemTotal />
      <CartList /> 
      <TotalCart />
    </Box>
  )
}

export default CartPage;