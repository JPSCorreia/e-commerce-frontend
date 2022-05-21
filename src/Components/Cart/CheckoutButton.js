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
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

function CheckoutButton() {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const authenticatedEmail = user.email
  const totalPrice = useSelector((state) => state.cartData.totalPrice)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const toast = useToast()
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartData.data)
  let navigate = useNavigate();

  const checkoutNow = () => {

    const getData = async () => {
      const token = await getAccessTokenSilently({        
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: 'openid'
      })
      const orderObj = {
        token: token,
        email: user.email
      }
      console.log('1')
      dispatch(api.cart.getCartProductsByEmail(orderObj))
      api.addOrder({authenticatedEmail, totalPrice}).then((result) => { 
        const orderId = result.data;
        const orderItems = []
        cartData.data.forEach((item) => {
          orderItems.push([item.id, orderId, item.quantity])            
        })
        api.addOrderItems(orderItems).then((result) => {
          console.log(result)
          api.deleteAllFromCart(authenticatedEmail).then(() => {

            // set cart items to 0 and navigate to order placed
            dispatch(api.cart.setNumberOfCartItems(0))
            navigate('/order-placed')
            // toast({
            //   title: 'Order Placed',
            //   description: "Your order was placed successful",
            //   status: 'success',
            //   duration: 9000,
            //   isClosable: true,
            // })
            // window.location.reload(false);
          })
        })
      })
    }
    getData();
  }

  return(
    <Box 
      className='checkout-button'
    >
      <Button 
        colorScheme='blue' 
        onClick={onOpen}
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
              Are you sure? You can't undo this action afterwards.
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