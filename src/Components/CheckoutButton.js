import '../Style/App.css';
import * as React from 'react';

import { Button, Box } from '@chakra-ui/react'

function CheckoutButton() {


  const checkoutNow = () => {

  }

  return(
    <Box className='checkout-button'>
      <Button colorScheme='blue' onClick={() => checkoutNow()}>
        Checkout
      </Button>
    </Box>
  )
}

export default CheckoutButton;