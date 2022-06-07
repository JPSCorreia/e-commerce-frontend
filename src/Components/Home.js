import '../Style/App.css';
import * as React from 'react';
import { Box, chakra, Text, Image, useColorMode, useColorModeValue } from '@chakra-ui/react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselItem from './CarouselItem';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../Features/routes';
import { useEffect } from 'react';
import Loader from './Loader';
import { NavLink } from 'react-router-dom';

function Home() {

  // React/Redux State/Action Management.
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productData.data)
  const { colorMode } = useColorMode()
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  const dataIsLoading = useSelector((state) => state.productData.dataIsLoading)

  useEffect(() => {

    const getData = async () => {
      await dispatch(api.products.getProductPage(1))
    }
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  if (dataIsLoading) {
    return <Loader />;
  }

  return(
    <>
    {/* <Image src={(colorMode === 'light')? '/images/emporium-light.png' : '/images/emporium-dark.png'} margin='1.5rem auto' maxWidth='20%'/> */}
    <NavLink
      to={'/products/1'}
      className='home-page-link'
    >
      <Image 
        className='navbar-logo' 
        src={(colorMode === 'light')? '/images/emporium-light.png' : '/images/emporium-dark.png'}
        minWidth='215px'
        maxWidth='215px'
        margin='0.5rem auto'
        borderRadius='4px'
      />
    </NavLink>
    <Box 
      className='carousel-container'
      // padding='0 auto'
      backgroundColor={backgroundColor}
      width='90%'
      borderRadius='8px'
      margin='0 auto'
      display='flex'
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
    </>
  )
}

export default Home;