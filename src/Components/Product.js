import '../Style/App.css';
import * as React from 'react';
import { useState } from 'react';
import { api } from '../Features/routes';
import { Box, Image, Button, ListItem, useColorModeValue } from '@chakra-ui/react'
import {NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { setNumberOfItems } from '../Features/cartItemsSlice';
import { useDispatch } from 'react-redux';

function Product(props) {

  // React/Redux State/Action Management.
  const { user } = useAuth0();
  const dispatch = useDispatch();
  
  const id = props.product.id
  const [stock, setStock] = useState(props.product.stock);

  const addToCart = () => {
    //Look if item exists in cart already
    const authenticatedEmail = user.email
    if (stock > 0) {
      api.getCartByEmail({authenticatedEmail, id}).then((result) => {
        const quant = document.getElementById(`number-input-${props.id}`).value;
        if (result.data.length < 1) {
          //Create new row if product doesn't already exist in cart
          api.addProductToCart({authenticatedEmail, id, quant}).then(() => {
            setStock(stock-quant)
            api.removeStock({quant, id}).then(() => {
              setStock(stock-quant)
              api.getItemTotal(authenticatedEmail).then((result) => {
                dispatch(setNumberOfItems(result.data[0].sum))
              })
            })
          })
        } else {
          //Add to existing row if product already exists in cart
          api.removeStockAddQuantity({quant, id, authenticatedEmail}).then(() => {
            setStock(stock-quant)
            api.getItemTotal(authenticatedEmail).then((result) => {
              dispatch(setNumberOfItems(result.data[0].sum))
            })
          })
        }
      })
    }
  }


  return(
    <ListItem 
      id={props.id}
      className='product'
      border='1px solid'
      borderColor={
        useColorModeValue('blue.500', 'blue.200')
      }
    >
      <Box className='product-description'>
        <Box className='product-name'>
          {props.product.name} - {props.product.description} 
        </Box>
        <Box className='product-stock'>Stock: {stock}</Box>
        <Box className='product-price'>Price: {props.product.price}€</Box>
        <NumberInput id={'number-input-'+props.id} defaultValue={1} min={1} max={props.product.stock}>
          <NumberInputField />
          <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button colorScheme='blue' onClick={() => addToCart()}>Add to Cart</Button>
      </Box>
      <Image
        className='product-image-preview'
        alt={`${props.product.image_link}`}
        src={`images/${props.product.image_link}.jpg`}
      />
    </ListItem>
  )
}

export default Product;