import '../../Style/App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { api } from '../../Features/routes';
import { Box, Image, Button, useColorModeValue } from '@chakra-ui/react'
import {NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { setNumberOfItems } from '../../Features/cartItemsSlice';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";

function ProductItem() {

  // React/Redux State/Action Management.
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const borderColor = useColorModeValue('blue.500', 'blue.200');
  const { id } = useParams();
  let navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [stock, setStock] = useState(product.stock);

  useEffect(() => {
    api.getProduct(id).then((result) => {
      
      setProduct(result.data[0]);
      setStock(product.stock)
    });
  }, [id, product.stock])

  console.log(product)  
  
  const addToCart = () => {
    //Look if item exists in cart already
    const authenticatedEmail = user.email
    if (stock > 0) {
      api.getCartByEmail({authenticatedEmail, id}).then((result) => {
        const quant = document.getElementById(`number-input-${id}`).value;
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
        navigate('/products')
      })
    }
  }


  return(
    <Box
    width="80%"
    display='flex'
    justifyContent='center'
    margin='0 auto'
  >
    <Box
      className='product'
      display='flex'
      flexDirection='row'
      width='80%'
      justifyContent='space-between'
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
          {product.name} - {product.description} 
        </Box>
        <Box 
          className='product-stock'
          marginTop='1rem'
        >
          Stock: {stock}
        </Box>
        <Box 
          className='product-price'
          marginTop='1rem'
          marginBottom='1rem'
        >
          Price: {product.price}€
        </Box>
        <NumberInput 
          id={'number-input-'+id} 
          defaultValue={1} 
          min={1} 
          max={product.stock}
        >
          <NumberInputField />
          <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button 
        colorScheme='blue' 
        onClick={() => addToCart()}
        >
          Add to Cart
        </Button>
      </Box>
        <Image
          className='product-image-preview'
          alt={`${product.image_link}`}
          src={`/images/${product.image_link}.jpg`}
          display='inline-block'
          maxWidth='230px'
          maxHeight='95px'
          width='auto'
          height='auto'
          margin='2rem'
        />
        </Box>
    </Box>
  )
}

export default ProductItem;