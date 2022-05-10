import '../Style/App.css';
import * as React from 'react';
import Product from './Product';
import { useEffect, useState } from 'react';
import { api } from '../Features/routes';
import { useDispatch, useSelector } from 'react-redux';
import { setProductListLoaded } from '../Features/loadedComponentsSlice';

import { Heading, Box, List } from '@chakra-ui/react'



function ProductList() {

  // React/Redux State/Action Management.
  const [productListData, setProductListData] = useState([]);
  const dispatch = useDispatch();
  const productListLoaded = useSelector((state) => state.loadedComponents.productList)


  useEffect(() => {
    const loadData = () => {
      // get all products from the database and put them in an array
      api.getProducts().then((result) => {
        dispatch(setProductListLoaded(true))
        const list = result.data?.map((product, index) => (
          <Product 
            product={product}
            key={index}
            id={`product-${index+1}`}
          />
        ))
        setProductListData(list);
      })
    }
    loadData();
  }, [dispatch, productListLoaded]);



  return(
    <Box className='ProductList'>
      <Heading>Products</Heading>
      {/* {!productListLoaded && <Spinner size='xl'/>} */}
      <List>
       {productListLoaded && productListData}
      </List>
    </Box>
  )
}

export default ProductList;