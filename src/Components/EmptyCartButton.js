import '../Style/App.css';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../Features/routes';
import { Button, Box } from '@chakra-ui/react'

function EmptyCartButton() {

  // React/Redux State/Action Management.
  const authenticatedEmail = useSelector((state) => state.isAuthenticated.email)
  const dispatch = useDispatch();

  const emptyCartNow = () => {

  }

  return(
    <Box className='empty-cart-button'>
      <Button onClick={() => emptyCartNow()}>
        Empty Cart
      </Button>
    </Box>
  )
}

export default EmptyCartButton;