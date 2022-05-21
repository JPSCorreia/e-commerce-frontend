import '../../Style/App.css';
import * as React from 'react';
// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../Features/routes';
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Image, Button, ListItem, useColorModeValue } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'

function CartItem(props) {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const numberOfCartItems = useSelector((state) => state.cartData.numberOfCartItems)
  const totalPrice = useSelector((state) => state.cartData.totalPrice)
  const borderColor = useColorModeValue('blue.500', 'blue.200');
  const cartData = useSelector((state) => state.cartData.cartProductsData)
  const cartDataIsLoading = useSelector((state) => state.cartData.dataIsLoading)

  const removeFromCart = async () => {
    const quantityNumberInput = document.getElementById(`number-input-${props.product.id}`).value;
    const token = await getAccessTokenSilently({        
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: 'openid'
    })
    const index = cartData.findIndex((element) => (element.id === props.product.id))

    if (props.product.quantity - quantityNumberInput === 0) {
      dispatch(api.cart.setNumberOfCartItems(numberOfCartItems - quantityNumberInput))
      dispatch(api.cart.setTotalPrice(totalPrice - props.product.price))
      dispatch(api.cart.removeQuantity({ quantity: quantityNumberInput, products_id: Number(props.product.id), user_email: user.email, index }))
      dispatch(api.products.addStock({id: props.product.id, quantity: quantityNumberInput}))
      dispatch(api.cart.deleteFromCart({products_id: props.product.id, user_email: user.email, index}))
      dispatch(api.cart.getCartProductsByEmail({token, email: user.email}))
    }
    if (props.product.quantity - quantityNumberInput > 0) {
      dispatch(api.cart.setNumberOfCartItems(numberOfCartItems - quantityNumberInput))
      dispatch(api.cart.setTotalPrice(totalPrice - props.product.price))
      dispatch(api.cart.removeQuantity({ quantity: quantityNumberInput, products_id: Number(props.product.id), user_email: user.email, index }))
      dispatch(api.products.addStock({id: props.product.id, quantity: quantityNumberInput}))
      dispatch(api.cart.getCartProductsByEmail({token, email: user.email}))
    }
  }


  const removeAllFromCart = async () => {
    const index = cartData.findIndex((element) => (element.id === props.product.id))
    dispatch(api.cart.setNumberOfCartItems(numberOfCartItems - props.product.quantity))
    dispatch(api.cart.setTotalPrice(totalPrice - ((props.product.price)*props.product.quantity)))
    dispatch(api.cart.removeQuantity({ quantity: props.product.quantity, products_id: Number(props.product.id), user_email: user.email }))
    dispatch(api.products.addStock({id: props.product.id, quantity: props.product.quantity}))
    dispatch(api.cart.deleteFromCart({products_id: props.product.id, user_email: user.email, index}))
  }

  return(
    <>
      { !cartDataIsLoading  && 
        <ListItem 
          className='product'
          id={`cart-item-${props.product.id}`}
          display='flex'
          flexDirection='row'
          width='80%'
          justifyContent='space-between'
          alignSelf='center'
          alignItems='center'
          border='1px solid'
          borderRadius='3px'
          borderColor={borderColor}
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
          <Box className='product-name'>
            {props.product.name} - {props.product.description} 
          </Box>
          <Box 
            className='product-price'
            marginTop='1rem'
            marginBottom='1rem'
          >
            Total Price: {(props.product.price * props.product.quantity)}€
          </Box>
          <Box 
            className='product-quantity'
            marginBottom='1rem'
          >
            Quantity: {props.product.quantity}
          </Box>
          <NumberInput 
            id={'number-input-'+props.product.id} 
            defaultValue={1} 
            min={1} 
            max={props.product.quantity}
          >
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button 
            colorScheme='blue' 
            onClick={() => removeFromCart()}
          >
            Remove from Cart
          </Button>
          <Button 
            colorScheme='blue' 
            onClick={() => removeAllFromCart()}
          >
            Remove All from Cart
          </Button>
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
      }
    </>
  )
}

export default CartItem;