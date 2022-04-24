import '../Style/App.css';
import * as React from 'react';
import { useSelector } from 'react-redux';


function Dashboard() {

  const username = useSelector((state) => state.isAuthenticated.username)

  return(
    <div className='Dashboard'>
      <h1>Dashboard</h1>
      <p>
        Welcome {username}
      </p>
    </div>
  )
}

export default Dashboard;