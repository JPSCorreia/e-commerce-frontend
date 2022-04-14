import '../Style/App.css';
import * as React from 'react';

import { useGetUsersQuery } from "../Features/apiSlice";

function CartList() {

  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess
  } = useGetUsersQuery();

  return(
    <div className='CartList'>
            <h1>Cart</h1>
      <ul>
      {isLoading && <h2>...Loading</h2>}
      {isError && <h2>Something went wrong {error.status}</h2>}
      {isSuccess &&
        users?.map((user, index) => (
          <li key={index} >{user.username} - {user.first_name} {user.last_name}</li>
        ))
      }
      </ul>
    </div>
  )
}

export default CartList;