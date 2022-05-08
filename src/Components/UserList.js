import '../Style/App.css';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../Features/routes';
import { Heading, Box, List, ListItem, useColorModeValue } from '@chakra-ui/react'

function UserList() {

  // React/Redux State/Action Management.
  const [listLoaded, setListLoaded] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const borderColor = useColorModeValue('blue.500', 'blue.200');

  useEffect(() => {
    const loadData = () => {
      api.getUsers().then((result) => {
        setListLoaded(true)
        const list = result.data?.map((user, index) => (
          <ListItem 
            key={index} 
            border='1px solid'
            borderColor={borderColor}
            className='user'
          >
            {user.email} - Admin: {user.admin? 'true' : 'false'} {user.last_name}      
          </ListItem>
        ))
        setUsersData(list);
      })
    }
    loadData();
  }, [borderColor]);

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