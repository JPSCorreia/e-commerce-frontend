import '../Style/App.css';
import * as React from 'react';
import { api } from '../Features/routes';
import { Button, Box, useDisclosure } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'


function CheckoutButton() {

  // React/Redux State/Action Management.
  const email = useSelector((state) => state.isAuthenticated.email) 
  const totalPrice = useSelector((state) => state.cartItems.totalPrice)
  const authenticatedEmail = useSelector((state) => state.isAuthenticated.email)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()


  const checkoutNow = () => {

    /* 
      make a GET request to get all cart items from user_email = logged user
      and save them to an array.

      after that send 2 POST requests: 
      one to create a new Order returning the id from that order 
      
      one to create all the order_items sending the id from the new order and
      the saved array from the get request in a POST to create all order_items

      finally send a DELETE request to delete all cart_items from user_email = logged user

    */
      api.getCartProductsByEmail(email).then((result) => {
        const cartList = result.data
        api.addOrder({authenticatedEmail, totalPrice}).then((result) => { 
          const orderId = result.data;
          const orderItems = []
          cartList.forEach((item) => {
            orderItems.push([item.id, orderId, item.quantity])            
          })
          api.addOrderItems(orderItems).then((result) => {
            api.deleteAllFromCart(authenticatedEmail).then(() => {
              //TODO: change to show order page later
              window.location.reload(false);
            })
          })

        })
      })
      

  }

  return(
    <Box className='checkout-button'>
      <Button colorScheme='blue' onClick={onOpen}>
        Checkout
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Complete Purchase
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={checkoutNow} ml={3}>
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