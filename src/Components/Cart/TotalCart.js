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
        flexDirection={['column','row']}
        marginBottom='1rem' 
        width={['90%','80%']}
        alignSelf='center'
        borderRadius=' 3px ' 
        justifyContent='space-between'
        alignItems='center'
      >
        <Heading 
          fontSize={['xl', '3xl']}
          marginBottom={['0.5rem','0']}
        >
          Total Price: {Number(totalPrice).toFixed(2).replace('.', ',')}€
        </Heading>
        <Box display='flex'>
        <EmptyCartButton />
        <CheckoutButton />
        </Box>

      </Box>} 
    </>
  )
}

export default TotalCart;