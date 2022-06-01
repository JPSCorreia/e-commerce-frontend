import '../Style/App.css';
import * as React from 'react';
import { Box, Image, useColorMode, useColorModeValue } from '@chakra-ui/react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselItem from './CarouselItem';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../Features/routes';
import { useEffect } from 'react';

function Home() {

  // React/Redux State/Action Management.
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productData.data)
  const { colorMode } = useColorMode()
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');

  useEffect(() => {

    const getData = async () => {
      dispatch(api.products.getProducts()) 
    }
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return(
    <>
    <Image src={(colorMode === 'light')? '/images/emporium-light.png' : '/images/emporium-dark.png'} margin='1.5rem auto' maxWidth='20%'/>
    <Box 
      className='carousel-container'
      padding='0 auto'
      backgroundColor={backgroundColor}
      width='95%'
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