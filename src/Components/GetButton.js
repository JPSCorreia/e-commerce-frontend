import '../Style/App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../Features/toggleUsersSlice';
import UserList from './UserList';

function GetButton() {
  
  const dispatch = useDispatch();

  const handleToggleUsers = () => {
    dispatch(toggle());
  }
  const userListState = useSelector((state) => state.toggleUsers.value)

  return(
    <div className="GetButton">
      <Button variant="contained" color="secondary" onClick={handleToggleUsers}>
        Get Users
      </Button>
      { userListState? <UserList /> : null }
    </div>
  )
}
  
export default GetButton;