import '../../Style/App.css';
import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../Features/routes';
import { setNumberOfItems } from '../../Features/cartItemsSlice';
import { setTotalPrice } from '../../Features/cartItemsSlice';
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Image, Button, ListItem, useColorModeValue } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'


function CartItem(props) {

  // React/Redux State/Action Management.
  const { user } = useAuth0();
  const authenticatedEmail = user.email
  const [quantity, setQuantity] = useState(props.product.quantity);
  const [hidden, setHidden] = useState(false);
  const id = props.product.id;
  const dispatch = useDispatch();
  const numberOfItems = useSelector((state) => state.cartItems.numberOfItems)
  const totalPrice = useSelector((state) => state.cartItems.totalPrice)
  const borderColor = useColorModeValue('blue.500', 'blue.200');

  const removeFromCart = (id) => {
    const quant = document.getElementById(`number-input-${props.product.id}`).value;
    if (quantity -quant === 0) {
      setHidden(true)
      setQuantity(0)
      dispatch(setNumberOfItems(numberOfItems - quant))
      dispatch(setTotalPrice(totalPrice - props.product.price))
      api.removeQuantityAddStock({quant, id, authenticatedEmail}).then(() => {
        api.deleteFromCart(id).then(() => {
        })
      })
    }
    if (quantity - quant > 0) {
      setQuantity(quantity-quant)
      dispatch(setNumberOfItems(numberOfItems - quant))
      dispatch(setTotalPrice(totalPrice - props.product.price))
      api.removeQuantityAddStock({quant, id, authenticatedEmail}).then(() => {
      })
    }
  }

  const removeAllFromCart = (id) => {
    const quant = quantity
    if (quantity > 0) {
      setHidden(true)
      setQuantity(0)
      dispatch(setNumberOfItems(numberOfItems - quant))
      dispatch(setTotalPrice(totalPrice - (props.product.price)*quant))
      api.removeQuantityAddStock({quant, id, authenticatedEmail}).then(() => {
        api.deleteFromCart(id).then(() => {
        })
      })
    }
  }

  return(
    <>
      { !hidden && 
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
            Total Price: {(props.product.price * quantity)}€
          </Box>
          <Box 
            className='product-quantity'
            marginBottom='1rem'
          >
            Quantity: {quantity}
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
            onClick={() => removeFromCart(id)}
          >
            Remove from Cart
          </Button>
          <Button 
            colorScheme='blue' 
            onClick={() => removeAllFromCart(id)}
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