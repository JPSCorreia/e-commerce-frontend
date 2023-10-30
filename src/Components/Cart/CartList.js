import '../../Style/App.css';
import * as React from 'react';
import CartItem from './CartItem.js';
import { useSelector, } from 'react-redux';
import { Box, List } from '@chakra-ui/react'


function CartList() {

  // React/Redux State/Action Management.
  const cartData = useSelector((state) => state.cartData.cartProductsData)

  return(
    <Box className='cart-list'>
      <List>
        {cartData? cartData.map((product, index) => (
          <CartItem 
            product={product}
            key={index}
            id={`cart-product-${product.id}`}
          />
        )) : ''}
      </List>
    </Box>
  )
}

export default CartList;
