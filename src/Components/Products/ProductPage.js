import '../../Style/App.css';
import * as React from 'react';
import ProductList from './ProductList';
import { Box } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../Features/routes';


function ProductPage() {

  const location = useLocation();
  const toast = useToast()
  const addToCartToastDisplayed = useSelector((state) => state.cartData.addToCartToastDisplayed)
  const dispatch = useDispatch();

  useEffect(() => {

    if (location.state && !addToCartToastDisplayed) {
      toast({
        title: 'Success!',
        description: `Your item ${location.state.product.name} was added to your cart.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      dispatch(api.cart.setAddToCartToastDisplayed(true))
    }

    const getData = async () => {
      dispatch(api.products.getProducts()) 
    }
    getData();

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if (dataIsLoading) {
  //   return <Loader />;
  // }

  return(
    <Box className='product-page'>
      <ProductList />
    </Box>
  )
}

export default ProductPage;