import '../../Style/App.css';
import * as React from 'react';
import ProductList from './ProductList';
import PageChanger from '../PageChanger';
import { Box } from '@chakra-ui/react'
import { useToast, useColorModeValue } from '@chakra-ui/react'
import {useLocation, NavLink} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../Features/routes';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import {ChevronRightIcon} from '@chakra-ui/icons';
import { useParams } from "react-router-dom";


function ProductPage() {

  const location = useLocation();
  const toast = useToast()
  const addToCartToastDisplayed = useSelector((state) => state.cartData.addToCartToastDisplayed)
  const dispatch = useDispatch();
  const themeColor = useColorModeValue('blue.500', 'blue.200');
  const { page } = useParams();

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
      await dispatch(api.products.getProductPage(page)) 
    }
    getData();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps


  return(
    <Box className='product-page'>
      <Breadcrumb  
        display='flex' 
        width='80%' 
        margin='0.5rem auto'
        paddingTop='0.25rem'
        separator={<ChevronRightIcon color='gray.500' />}
        className='breadcrumb'
      >
        <BreadcrumbItem  marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink  as={NavLink} to='/'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem >
        <BreadcrumbItem isCurrentPage marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink color={themeColor}>
            Products ({`${page}`})
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <ProductList />
      <PageChanger />
    </Box>
  )
}

export default ProductPage;