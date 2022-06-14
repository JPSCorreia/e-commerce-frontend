import '../../Style/App.css';
import * as React from 'react';
import { api } from '../../Features/routes';
import { Box, List } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Address from './Address';


function AddressList() {

  // React/Redux State/Action Management.
  const dispatch = useDispatch();
  const addressesData = useSelector((state) => state.addressesData.data || [])
  const { user, getAccessTokenSilently } = useAuth0();

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

  return (
    <Box className='address-list'>
      <List marginBottom='1rem'>
      {addressesData?.map((address, index) => (
          <Address 
            address={address}
            key={index}
            id={`address-${index+1}`}
          />
        ))}
      </List>
    </Box>

  )

}

export default AddressList;