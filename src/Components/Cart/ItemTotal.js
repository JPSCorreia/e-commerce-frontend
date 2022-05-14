import '../../Style/App.css';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Heading, Box } from '@chakra-ui/react'

function ItemTotal() {

  // React/Redux State/Action Management.
  const numberOfItems = useSelector((state) => state.cartItems.numberOfItems)

  return(
    <>
        <Box 
          className='item-total'
          display='flex'
          flexDirection='column'
          width='80%'
          margin='1rem'
          padding='0'
          alignSelf='center'
        >
          { ((numberOfItems === 0) || (!numberOfItems)) && (<Heading>Cart is empty.</Heading>)}
          { (numberOfItems > 0) && (<Heading>{numberOfItems} items in cart</Heading>)}
        </Box>
    </>

  )
}

export default ItemTotal;