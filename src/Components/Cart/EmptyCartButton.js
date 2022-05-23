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

//TODO: finish this component
function EmptyCartButton() {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const cancelRef = React.useRef()

  const emptyCartNow = () => {

    const getData = async () => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
       audience: process.env.REACT_APP_AUTH0_AUDIENCE,
       scope: 'openid'
     })
    }
    getData();
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
              Empty Cart
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
                colorScheme='red' 
                onClick={emptyCartNow} 
                ml={3}
              >
                Empty
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default EmptyCartButton;