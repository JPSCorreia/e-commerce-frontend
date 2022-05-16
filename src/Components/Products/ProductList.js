import '../../Style/App.css';
import * as React from 'react';
import Product from './Product';
import { useEffect, useState } from 'react';
import { api } from '../../Features/routes';
import { useDispatch, useSelector } from 'react-redux';
import { setProductListLoaded } from '../../Features/loadedComponentsSlice';
import { useAuth0 } from "@auth0/auth0-react";
import { Heading, Box, List } from '@chakra-ui/react'



function ProductList() {

  // React/Redux State/Action Management.
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const audience = "https://dev-ymfo-vr1.eu.auth0.com/api/v2/" 
  const productData = useSelector((state) => state.productData.data)


  useEffect(() => {
    const getData = async () => {
      dispatch(api.getProducts()) 
      dispatch(setProductListLoaded(true))
    }
    getData();
  }, [dispatch, getAccessTokenSilently]);



  return(
    <Box 
      className='product-list'
    >
      <Heading>
        Products
      </Heading>
      <List>
      {productData.data?.map((product, index) => (
          <Product 
          product={product}
          key={index}
          id={`product-${index+1}`}
        />
      ))}
      </List>
    </Box>
  )
}

export default ProductList;