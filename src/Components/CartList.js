import '../Style/App.css';
import * as React from 'react';
import CartItem from './CartItem.js';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../Features/routes';
import { setNumberOfItems } from '../Features/cartItemsSlice';
import { setCartListLoaded } from '../Features/loadedComponentsSlice';
import { Spinner, Box, List } from '@chakra-ui/react'


function CartList() {

  // React/Redux State/Action Management.
  const email = useSelector((state) => state.isAuthenticated.email) 
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();
  const cartListLoaded = useSelector((state) => state.loadedComponents.cartList)


  
  useEffect(() => {
    api.getItemTotal(email).then((result) => {
      dispatch(setNumberOfItems(result.data[0].sum))
    })
  }, [dispatch, email])

  useEffect(() => {
    const loadData = () => {
      api.getCartProductsByEmail(email).then((result) => {
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
  }, [dispatch, email]);


  return(
    <Box className='cart-list'>
      { !cartListLoaded && <Spinner size='xl'/>}
      { cartListLoaded && 
      <List>
      {productData}
      </List>
      }
    </Box>
  )
}

export default CartList;