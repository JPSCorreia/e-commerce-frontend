import '../Style/App.css';
import * as React from 'react';
import { useEffect } from 'react';
import { api } from '../Features/routes';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Text, Heading, Box, List, ListItem, useColorModeValue } from '@chakra-ui/react'


function UserList() {

  // React/Redux State/Action Management.
  const borderColor = useColorModeValue('blue.500', 'blue.200');
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data)

  useEffect(() => {
    const loadData = async () => {
      await dispatch(api.users.getUsers()) 
    }
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return(
    <Box className='user-list'>
      <Heading>Users</Heading>
      <List>
        {userData.data?.map((user, index) => (
          <ListItem 
            key={index} 
            borderColor={borderColor}
            className='user'
            backgroundColor={backgroundColor}
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            width='80%'
            alignSelf='center'
            borderRadius='8px'
            margin='2rem'
            padding='2rem'
          >
            <Avatar src={user.image_link} mr="0.5rem"/>
            <Text> {user.email} - Admin: {user.admin? 'true' : 'false'} {user.last_name}</Text>      
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default UserList;