import '../../Style/App.css';
import * as React from 'react';
import CartItem from './CartItem.js';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../Features/routes';
import { setNumberOfItems } from '../../Features/cartItemsSlice';
import { setCartListLoaded } from '../../Features/loadedComponentsSlice';
import { Box, List } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";


function CartList() {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartData.data)
  const audience = "https://dev-ymfo-vr1.eu.auth0.com/api/v2/" 

  
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
      api.getItemTotal(user.email).then((result) => {
        dispatch(setNumberOfItems(result.data[0].sum))
        dispatch(api.getCartProductsByEmail(orderObj))
        dispatch(setCartListLoaded(true)) 
      })
    }
    getData();
  }, [dispatch, getAccessTokenSilently, user.email])


  return(
    <Box className='cart-list'>
      <List>
        {cartData.data?.map((product, index) => (
          <CartItem 
            product={product}
            key={index}
            id={`cart-product-${product.id}`}
          />
        ))}
      </List>
    </Box>
  )
}

export default CartList;
