import '../Style/App.css';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../Features/routes';
import { Avatar, Text, Heading, Box, List, ListItem, useColorModeValue } from '@chakra-ui/react'


function UserList() {

  // React/Redux State/Action Management.
  const [listLoaded, setListLoaded] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const borderColor = useColorModeValue('blue.500', 'blue.200');
  const backgroundColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    const loadData = () => {
      api.getUsers().then((result) => {
        setListLoaded(true)
        const list = result.data?.map((user, index) => (
          <ListItem 
            key={index} 
            // border='1px solid'
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
        ))
        setUsersData(list);
      })
    }
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return(
    <Box className='UserList'>
      <Heading>Users</Heading>
      <List>
      { !listLoaded && <h2>Not Loaded yet.</h2>}
      { listLoaded && !usersData && <h2>Something went wrong</h2>}
      { listLoaded && usersData }
      </List>
    </Box>
  )
}

export default UserList;