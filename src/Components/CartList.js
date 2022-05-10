import '../Style/App.css';
import * as React from 'react';
import CartItem from './CartItem.js';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../Features/routes';
import { setNumberOfItems } from '../Features/cartItemsSlice';
import { setCartListLoaded } from '../Features/loadedComponentsSlice';
import { Box, List } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";


function CartList() {

  // React/Redux State/Action Management.
  const { user } = useAuth0();
  const authenticatedEmail = user.email

  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();
  const cartListLoaded = useSelector((state) => state.loadedComponents.cartList)


  
  useEffect(() => {
    api.getItemTotal(authenticatedEmail).then((result) => {
      dispatch(setNumberOfItems(result.data[0].sum))
    })
  }, [dispatch, authenticatedEmail])

  useEffect(() => {
    const loadData = () => {
      api.getCartProductsByEmail(authenticatedEmail).then((result) => {
        dispatch(setCartListLoaded(true))
        const list = result.data?.map((product, index) => (
          <CartItem 
            product={product}
            key={index}
            id={`cart-product-${product.id}`}
          />
        ))
        setProductData(list);
      })
    }
    loadData();
  }, [dispatch, authenticatedEmail]);


  return(
    <Box className='cart-list'>
      { cartListLoaded && 
      <List>
      {productData}
      </List>
      }
    </Box>
  )
}

export default CartList;