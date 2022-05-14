import '../../Style/App.css';
import * as React from 'react';
import ProductList from './ProductList';
import { Box } from '@chakra-ui/react'


function ProductPage() {

  return(
    <Box className='product-page'>
      <ProductList />
    </Box>
  )
}

export default ProductPage;