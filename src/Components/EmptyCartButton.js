import '../Style/App.css';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../Features/routes';
import { Button, Box } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";

function EmptyCartButton() {

  // React/Redux State/Action Management.
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const authenticatedEmail = user.email

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