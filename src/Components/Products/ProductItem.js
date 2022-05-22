import '../../Style/App.css';
import * as React from 'react';
import { useEffect } from 'react';
import { api } from '../../Features/routes';
import { Box, Heading, Image, Button, useColorModeValue } from '@chakra-ui/react'
import {NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";

function ProductItem() {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const borderColor = useColorModeValue('blue.500', 'blue.200');
  const { id } = useParams();
  const idIndex = (useParams().id - 1)
  let navigate = useNavigate();
  const product = useSelector((state) => state.productData.data.data[idIndex] || [])
  const cartData = useSelector((state) => state.cartData.cartProductsData)


  useEffect(() => {
    const getData = async () => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
       audience: process.env.REACT_APP_AUTH0_AUDIENCE,
       scope: 'openid'
     })
      await dispatch(api.cart.getCartProductsByEmail({ token, email: user.email }))
      
    }
    getData();

  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const addToCart = async () => {

    //Search if item has stock
    if (product.stock > 0) {
      const quantity = document.getElementById(`number-input-${id}`).value;
      const token = await getAccessTokenSilently({        
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: 'openid'
      })

      // create a new row if product doesn't already exist
      if ( cartData.length < 1  || !(cartData.find(element => element.id === Number(id))?.id === Number(id)) ) {
        await dispatch(api.cart.addProductToCart({user_email: user.email, products_id: Number(id), quantity: quantity }))
        dispatch(api.products.removeStock({id, quantity: quantity}))
      // update row if product already exists
      } else { 
         dispatch(api.products.removeStock({id, quantity: quantity}))
        await dispatch(api.cart.addQuantity({ quantity: quantity, products_id: Number(id), user_email: user.email }))
      }

      // update number of items in cart and navigate to products page while showing toast
      await dispatch(api.cart.getNumberOfCartItems({token, email: user.email}))
      await dispatch(api.cart.setAddToCartToastDisplayed(false))
      navigate('/products', {state: { product, quantity } } )
    }
  }

  

  return(
    <Box><Heading>Product Details</Heading>
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
            Stock: {product.stock}
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
    </Box>
  )
}

export default ProductItem;