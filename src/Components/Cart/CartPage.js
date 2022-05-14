import '../../Style/App.css';
import * as React from 'react';
import TotalCart from './TotalCart';
import ItemTotal from './ItemTotal';
import CartList from './CartList';
import { Box } from '@chakra-ui/react'


function CartPage() {

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