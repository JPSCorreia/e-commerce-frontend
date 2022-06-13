import '../../Style/App.css';
import * as React from 'react';
import { api } from '../../Features/routes';
import { Button, Box, useDisclosure, Heading } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { IoBagCheckOutline } from 'react-icons/io5'
import CartAddress from './CartAddress';
import { useEffect } from 'react';
import AddAddressButton from '../Addresses/AddAddressButton';


function CheckoutButton() {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const totalPrice = useSelector((state) => state.cartData.totalPrice)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartData.cartProductsData)
  let navigate = useNavigate();
  const addressesData = useSelector((state) => state.addressesData.data || [])

  const checkoutNow = () => {

    const getData = async () => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
       audience: process.env.REACT_APP_AUTH0_AUDIENCE,
       scope: 'openid'
     })
      await dispatch(api.cart.getCartProductsByEmail({token, email: user.email}))
      const orderId = await dispatch(api.orders.addOrder({
        user_email: user.email, 
        total_price: totalPrice,
        full_name: addressesData[0].full_name,
        street_address: addressesData[0].street_address,
        city: addressesData[0].city,
        postcode: addressesData[0].postcode,
        phone_number: addressesData[0].phone_number,
        country: addressesData[0].country
      })).unwrap()
      const orderItems = []
      cartData.forEach((item) => {
        orderItems.push([item.id, orderId, item.quantity, item.discount])            
      })

      await dispatch(api.orders.addOrderItems(orderItems))
      await dispatch(api.cart.deleteAllFromCart(user.email))
      
      // set cart items to 0 and navigate to order placed
      await dispatch(api.cart.setNumberOfCartItems(0))
      await dispatch(api.orders.setAddOrderToastDisplayed(false))

      const order = await dispatch(api.orders.getAllOrderItems({token, id: orderId})).unwrap()
      await navigate(`/orders/${orderId}`, {state: {order, toast: true} })

    }
    getData();
  }

  useEffect(() => {

    const getData = async () => {

      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
       audience: process.env.REACT_APP_AUTH0_AUDIENCE,
       scope: 'openid'
     })
      await dispatch(api.addresses.getAddresses({token, user_email: user.email})) 
    }
    getData();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps







  return(
    <Box 
      className='checkout-button'
    >
      <Button 
        colorScheme='green' 
        onClick={onOpen}
        className='button'
        rightIcon={<IoBagCheckOutline />}
      >
        Checkout
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size='5xl'
      >
        
        <AlertDialogOverlay>
          <AlertDialogContent width='90%'>
            <AlertDialogHeader 
              fontSize='lg' 
              fontWeight='bold'
              paddingBottom='0'
            >
              <Heading marginTop='0.5rem' fontSize={['xl', '2xl']} >Delivery Address</Heading>
              { (addressesData.length > 0)?              
                <CartAddress 
                  address={addressesData[0]}
                /> 
                : ''}
              { (addressesData.length < 1)?
                <Box 
                  display='flex'
                  flexDirection='column'
                >
                  <AddAddressButton 
                    width='100%'
                  /> 
                </Box>
                : ''}
            </AlertDialogHeader>
            <AlertDialogBody>
              Your order will be placed. You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button 
                ref={cancelRef} 
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                colorScheme='blue' 
                onClick={checkoutNow} 
                ml={3}
              >
                Complete Purchase
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default CheckoutButton;