import '../../Style/App.css';
import * as React from 'react';
import { Box, Image, Button, ListItem, useColorModeValue } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';

function Product(props) {

  const borderColor = useColorModeValue('blue.500', 'blue.200');



  return(
    <ListItem 
      className='product'
      id={props.id}
      display='flex'
      flexDirection='row'
      width='80%'
      justifyContent='space-between'
      alignSelf='center'
      alignItems='center'
      border='1px solid'
      borderColor={borderColor}
      borderRadius='3px'
      margin='1rem'
    >
      <Box 
        className='product-description'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        textAlign='left'
        margin='2rem'
      >
        <Box 
          className='product-name'
        >
          {props.product.name} - {props.product.description} 
        </Box>
        <Box 
          className='product-price'
          marginTop='1rem'
          marginBottom='1rem'
        >
          Price: {props.product.price}€
        </Box>
        <NavLink
          to={`${props.product.id}`}
          className='products-page-link'
        >
          <Button 
            className='order-details-button' 
            colorScheme='blue'
          >
            Details
          </Button>
        </NavLink>
      </Box>
      <Image
        className='product-image-preview'
        alt={`${props.product.image_link}`}
        src={`images/${props.product.image_link}.jpg`}
        display='inline-block'
        maxWidth='230px'
        maxHeight='95px'
        width='auto'
        height='auto'
        margin='2rem'
      />
    </ListItem>
  )
}

export default Product;