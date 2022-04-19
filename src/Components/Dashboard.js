import '../Style/App.css';
import * as React from 'react';

function Dashboard() {

  return(
    <div className='Dashboard'>
      <h1>Dashboard</h1>
      <p>
        You are logged in
      </p>
      <a
        className="App-link"
        href={"/auth/logout"}
      >
        Logout
      </a>
    </div>
  )
}

export default Dashboard;