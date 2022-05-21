import '../../Style/App.css';
import * as React from 'react';
import TotalCart from './TotalCart';
import ItemTotal from './ItemTotal';
import CartList from './CartList';
import { Box } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { api } from '../../Features/routes';
import Loader from '../Loader';
import { useAuth0 } from "@auth0/auth0-react";

function CartPage() {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const cartDataIsLoading = useSelector((state) => state.cartData.dataIsLoading)
  const numberOfCartItemsIsLoading = useSelector((state) => state.cartData.numberOfCartItemsIsLoading)
  const totalPriceIsLoading = useSelector((state) => state.cartData.totalPriceIsLoading)
  const dispatch = useDispatch();

  useEffect(() => { 
    const getData = async () => {
      const token = await getAccessTokenSilently({        
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: 'openid'
      })
      await dispatch(api.cart.getCartProductsByEmail({token, email: user.email}))
      await dispatch(api.cart.getTotalPrice({user_email: user.email}))
    }
    getData();
    
  }, [])

  if (cartDataIsLoading || numberOfCartItemsIsLoading || totalPriceIsLoading ) {
    return <Loader />;
  }

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