import '../Style/App.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar() {

  return(
    <div className='NavBar'>
     <NavLink
      to={'/register'}
      className='register-page-link'
    >
      <span>
        Register
      </span>
    </NavLink>
    <NavLink
      to={'/login'}
      className='login-page-link'
    >
      <span>
        Login
      </span>
    </NavLink>
    <NavLink
      to={'/users'}
      className='users-page-link'
    >
      <span>
        Users
      </span>
    </NavLink>
    </div>
  )
}

export default NavBar;