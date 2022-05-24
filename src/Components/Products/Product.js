import '../../Style/App.css';
import * as React from 'react';
import { Box, Image, Button, ListItem, useColorModeValue, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import { CgDetailsMore } from 'react-icons/cg'


function Product(props) {

  const borderColor = useColorModeValue('blue.500', 'blue.200');
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  const discountGreenColor = useColorModeValue('green.500', 'green.300');
  const discountYellowColor = useColorModeValue('yellow.600', 'yellow.400');

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
      // border='1px solid'
      borderColor={borderColor}
      borderRadius='8px'
      margin='1rem'
      backgroundColor={backgroundColor}
    >
      <Box 
        className='product-description'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        textAlign='left'
        margin='1.25rem 2rem'
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
          Price:
          { props.product.discount?
          <>
            <Text as='span' fontSize='xl' color={discountGreenColor}>{(props.product.price*(1-(props.product.discount / 100))).toFixed(2).replace('.', ',')}€</Text>
            <Text as='span' fontSize='sm' color={discountYellowColor}>(-{props.product.discount}%)</Text>
          </>
          :
          <>
            <Text as='span'>{(props.product.price).toFixed(2).replace('.', ',')}€</Text>
          </>
          }
        </Box>
        <NavLink
          to={`${props.product.id}`}
          className='products-page-link'
        >
          <Button 
            className='button' 
            colorScheme='blue'
            rightIcon={<CgDetailsMore />}
          >
            Details
          </Button>
        </NavLink>
      </Box>
      <Image
        className='product-image-preview'
        alt={`${props.product.image_link}`}
        src={`/images/${props.product.image_link}.jpg`}
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