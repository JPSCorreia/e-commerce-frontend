import '../../Style/App.css';
import * as React from 'react';
import { Button, Box, useDisclosure } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { CgTrashEmpty } from 'react-icons/cg'
import { useSelector, } from 'react-redux';
import { api } from '../../Features/routes';


function EmptyCartButton() {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const cancelRef = React.useRef()
  const cartData = useSelector((state) => state.cartData.cartProductsData)

  const emptyCartNow = async () => {
    const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
    await getAccessTokenSilently({
     audience: process.env.REACT_APP_AUTH0_AUDIENCE,
     scope: 'openid'
    })
    cartData.forEach(async (product) => {
      const index = cartData.findIndex((element) => (element.id === product.id))
      await dispatch(api.cart.deleteFromCart({products_id: product.id, user_email: user.email, index}))
      await dispatch(api.products.addStock({id: product.id, quantity: product.quantity}))
    })
    await dispatch(api.cart.setNumberOfCartItems(0))
    await dispatch(api.cart.setTotalPrice(0));
    await dispatch(api.cart.getCartProductsByEmail({token, email: user.email}))
    onClose();
  }


  return(
    <Box 
      className='empty-cart-button'
      marginRight='1.5rem'
    >
      <Button 
        colorScheme='red' 
        onClick={onOpen}
        rightIcon={<CgTrashEmpty />}
        className='button'
      >
        Empty Cart
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
              Remove items from cart
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
                onClick={emptyCartNow} 
                colorScheme='blue' 
                ml={3}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default EmptyCartButton;