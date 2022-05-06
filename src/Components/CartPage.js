import '../Style/App.css';
import * as React from 'react';
import TotalCart from './TotalCart.js';
import ItemTotal from './ItemTotal.js';
import CartList from './CartList.js';
import { Box } from '@chakra-ui/react'

function CartPage() {

  return(
    <Box className='cart-page center'>
      <ItemTotal />
      <CartList />
      <TotalCart />
    </Box>
  )
}

export default CartPage;