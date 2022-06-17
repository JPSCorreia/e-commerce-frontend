import '../Style/App.css';
import * as React from 'react';
import { Box, Image, useColorMode, useColorModeValue, Text, Show } from '@chakra-ui/react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselItem from './CarouselItem';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../Features/routes';
import { useEffect } from 'react';
import Loader from './Loader';
import { NavLink } from 'react-router-dom';
import DiscountedProductList from './Products/DiscountedProductList';


function Home() {

  // React/Redux State/Action Management.
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productData.data)
  const { colorMode } = useColorMode()
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  const dataIsLoading = useSelector((state) => state.productData.dataIsLoading)
  const textColor = useColorModeValue("gray.800", "gray.200")

  useEffect(() => {
    const getData = async () => {
      await dispatch(api.products.getProductPage(1)) 
    }
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // useEffect(() => {
  //   const getData = async () => {
  //     await dispatch(api.products.getMostDiscountedProducts(1))
  //   }
  //   getData();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps



  if (dataIsLoading) {
    return <Loader />;
  }

  return(
    <>
    {/* <NavLink
      to={'/products/1'}
      className='home-page-link'
    > */}
      {/* <Image 
        className='navbar-logo' 
        src={(colorMode === 'light')? '/images/emporium-light.png' : '/images/emporium-dark.png'}
        minWidth='321px'
        maxWidth='321px'
        margin='0.5rem auto'
        borderRadius='4px'
        mt={10}
      /> */}
    {/* </NavLink> */}
    <Box backgroundColor='rgba(0,0,0,0.5)' pt={1} pb={1}>
      <Text fontSize={['xs', 'sm', 'md']} color='white'>Shipping worlwide. Free shipping on all orders to the EU.</Text>
    </Box>
    <Show breakpoint='(max-width: 550px)'>
      <Image 
        className='navbar-logo' 
        src={(colorMode === 'light')? '/images/emporium-light.png' : '/images/emporium-dark.png'}
        // minWidth='320px'
        // maxWidth='320px'
        minWidth={['280px', '320px']}
        maxWidth={['280px', '320px']}
        margin='0 auto'
        mt={4}
        borderRadius='4px'
      />
    </Show>
    <Box 
      // className='carousel-container'
      // backgroundColor={backgroundColor}
      width='90%'
      borderRadius='8px'
      margin='0 auto'
      display='flex'
      mt={10}
    >
      <Slider dots autoplay className={(colorMode === 'light')? 'carousel-light' : 'carousel-dark'}>
      {productData.data?.map((product, index) => (
          <CarouselItem 
            product={product}
            key={index}
            id={`carousel-${product.id + 1}`}
          />  
        ))}
      </Slider>
      
    </Box>
    <DiscountedProductList />
    </>
  )
}

export default Home;