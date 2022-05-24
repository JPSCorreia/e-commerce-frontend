import '../../Style/App.css';
import * as React from 'react';
import { api } from '../../Features/routes';
import { Button, Box, useDisclosure } from '@chakra-ui/react'
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
// import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { IoBagCheckOutline } from 'react-icons/io5'

function CheckoutButton() {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();

  const totalPrice = useSelector((state) => state.cartData.totalPrice)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  // const toast = useToast()
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartData.cartProductsData)
  let navigate = useNavigate();

  const checkoutNow = () => {

    const getData = async () => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
       audience: process.env.REACT_APP_AUTH0_AUDIENCE,
       scope: 'openid'
     })
      await dispatch(api.cart.getCartProductsByEmail({token, email: user.email}))
      const orderId = await dispatch(api.orders.addOrder({user_email: user.email, total_price: totalPrice})).unwrap()
      const orderItems = []
      console.log(cartData)
      cartData.forEach((item) => {
        orderItems.push([item.id, orderId, item.quantity, item.discount])            
      })

      await dispatch(api.orders.addOrderItems(orderItems))
      await dispatch(api.orders.deleteAllFromCart(user.email))
      
      // set cart items to 0 and navigate to order placed
      await dispatch(api.cart.setNumberOfCartItems(0))
      await dispatch(api.orders.setAddOrderToastDisplayed(false))

      navigate('/order-placed', {state: '1' })
      
      // toast({
      //   title: 'Order Placed',
      //   description: "Your order was placed successful",
      //   status: 'success',
      //   duration: 9000,
      //   isClosable: true,
      // })
      // window.location.reload(false);
     
    }
    getData();
  }

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
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader 
              fontSize='lg' 
              fontWeight='bold'
            >
              Complete Purchase
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
                Purchase
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default CheckoutButton;