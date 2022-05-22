import '../../Style/App.css';
import * as React from 'react';
import { Button, Box } from '@chakra-ui/react'


//TODO: finish this component
function EmptyCartButton() {

  // React/Redux State/Action Management.

  const emptyCartNow = () => {
  }

  return(
    <Box 
      className='empty-cart-button'
    >
      <Button 
        onClick={() => emptyCartNow()}
      >
        Empty Cart
      </Button>
    </Box>
  )
}

export default EmptyCartButton;