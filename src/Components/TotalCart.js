import '../Style/App.css';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../Features/routes';
import { setTotalPrice } from '../Features/cartItemsSlice';
import CheckoutButton from './CheckoutButton';
import { Heading, Box } from '@chakra-ui/react'

function TotalCart() {

  // React/Redux State/Action Management.
  const authenticatedEmail = useSelector((state) => state.isAuthenticated.email)
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cartItems.totalPrice)
  const numberOfItems = useSelector((state) => state.cartItems.numberOfItems)
 

  useEffect(() => {
    api.getTotalPrice(authenticatedEmail).then((result) => {  
      if (result.data[0].sum) {
        dispatch(setTotalPrice(parseInt(result.data[0].sum)))
      } else {
        dispatch(setTotalPrice(parseInt(0)))
      }
    })
  }, [authenticatedEmail, dispatch, totalPrice]);

  return(
    <>
    { (numberOfItems > 0) && 
      <Box 
        className='total-cart box-center'         
      >
        <Heading>Total Price: {totalPrice}€</Heading>
        <CheckoutButton />
      </Box>} 
    </>
  )
}

export default TotalCart;