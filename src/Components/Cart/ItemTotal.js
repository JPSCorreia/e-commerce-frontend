import '../../Style/App.css';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Heading, Box } from '@chakra-ui/react'


function ItemTotal() {

  // React/Redux State/Action Management.
  const numberOfCartItems = useSelector((state) => state.cartData.numberOfCartItems)


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
        { ((numberOfCartItems === 0) || (!numberOfCartItems)) && (<Heading>Cart is empty.</Heading>)}
        { (numberOfCartItems > 0) && (<Heading>{numberOfCartItems} items in cart</Heading>)}
      </Box>
    </>

  )
}

export default ItemTotal;