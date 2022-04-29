import '../Style/App.css';
import * as React from 'react';
import { useLazyGetUsersQuery } from "../Features/apiSlice";
import { useEffect } from 'react';
import { useState } from 'react';

function UserList() {

  const [listLoaded, setListLoaded] = useState(false);

    const [
    triggerGetUsers,
    getUsersData,
  ] = useLazyGetUsersQuery();




  useEffect(() => {
    const loadData = () => {
      triggerGetUsers().then(() => {
        setListLoaded(true)
      })
    }
    loadData();
  }, [triggerGetUsers]);

  return(
    <div className='UserList'>
      <h1>Users</h1>
      <ul>
      {getUsersData.isUninitialized && <h2>Not Loaded yet.</h2>}
      {getUsersData.isError && <h2>Something went wrong {getUsersData.status}</h2>}
      { listLoaded &&
        getUsersData.data?.map((user, index) => (
          <li key={index} className='user'>{user.email} - Admin: {user.admin? 'true' : 'false'} {user.last_name}</li>
        ))
      }
      </ul>
    </div>
  )
}

export default UserList;