import '../../Style/App.css';
import * as React from 'react';
import { CgTrashEmpty } from 'react-icons/cg'
import { Button, Box, useDisclosure } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { api } from '../../Features/routes';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'


function RemoveAddressButton(props) {

  // React/Redux State/Action Management.
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const removeAddress = async () => {

    const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
    await getAccessTokenSilently({
     audience: process.env.REACT_APP_AUTH0_AUDIENCE,
     scope: 'openid'
   })
   await dispatch(api.addresses.deleteAddress({token, user_email: user.email, id: props.address.id}))
   await dispatch(api.addresses.getAddresses({token, user_email: user.email}))
   onClose();
  }

  return(
    <Box 
      className='remove-address-button'
      marginLeft={['', '0.75rem']}
    >
      <Button 
        colorScheme='red' 
        rightIcon={<CgTrashEmpty />}
        className='button'
        onClick={onOpen}
      >
        Remove Address
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay >
          <AlertDialogContent width='90%'>
            <AlertDialogHeader 
              fontSize='lg' 
              fontWeight='bold'
            >
              Remove Address
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
                onClick={removeAddress} 
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

export default RemoveAddressButton;










