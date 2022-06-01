import '../../Style/App.css';
import * as React from 'react';
import Product from './Product';
import { useSelector } from 'react-redux';
import { Box, List } from '@chakra-ui/react'


function ProductList() {

  // React/Redux State/Action Management.
  const productData = useSelector((state) => state.productData.data)

  return(
    <Box 
      className='product-list'
    >
      <List
        flexWrap='wrap'
        display='flex'
        flexDirection='row'
        borderRadius='20px'
        width='80%'
        margin='0 auto'
        justifyContent='space-between'
      >
        {productData.data?.map((product, index) => (
          <Product 
            product={product}
            key={index}
            id={`product-${product.id + 1}`}
          />   
        ))}
      </List>      
    </Box>
  )
}

export default ProductList;