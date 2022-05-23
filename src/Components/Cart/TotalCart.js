import '../../Style/App.css';
import * as React from 'react';
import { useSelector } from 'react-redux';
import CheckoutButton from './CheckoutButton';
import { Heading, Box } from '@chakra-ui/react'
import EmptyCartButton from './EmptyCartButton';

function TotalCart() {

  // React/Redux State/Action Management.
  const totalPrice = useSelector((state) => state.cartData.totalPrice)
  const numberOfCartItems = useSelector((state) => state.cartData.numberOfCartItems)

  return(
    <>
    { (numberOfCartItems > 0) && 
      <Box 
        className='total-cart'  
        display='flex'
        flexDirection='row'
        margin='1rem' 
        width='80%'
        alignSelf='center'
        borderRadius=' 3px ' 
        padding='0 0.5rem'
        justifyContent='space-between'
        alignItems='center'
      >
        <Heading>Total Price: {totalPrice}€</Heading>
        <Box display='flex'>
        <EmptyCartButton />
        <CheckoutButton />
        </Box>

      </Box>} 
    </>
  )
}

export default TotalCart;