import '../../Style/App.css';
import * as React from 'react';
import CartItem from './CartItem.js';
import { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../Features/routes';
import { setNumberOfItems } from '../../Features/cartItemsSlice';
import { setCartListLoaded } from '../../Features/loadedComponentsSlice';
import { Box, List } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";


function CartList() {

  // React/Redux State/Action Management.
  const { user } = useAuth0();
  const authenticatedEmail = user.email
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productData.data)
  const productDataIsLoading = useSelector((state) => state.productData.isLoading)
  console.log('render')
  
  useLayoutEffect(() => {
    api.getItemTotal(authenticatedEmail).then((result) => {
      dispatch(setNumberOfItems(result.data[0].sum))
      dispatch(api.getCartProductsByEmail(authenticatedEmail))
      dispatch(setCartListLoaded(true)) 
    })
  }, [dispatch, authenticatedEmail])

  if (productDataIsLoading) return '';

  return(
    <Box 
      className='cart-list'
    >
        <List>
          {productData.data?.map((product, index) => (
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
