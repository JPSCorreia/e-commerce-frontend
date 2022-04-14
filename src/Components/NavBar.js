import '../Style/App.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutNow } from '../Features/isAuthenticatedSlice';

function NavBar() {

  // Redux State/Action Management.
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value)
  const dispatch = useDispatch();

  const handleLogoutNow = (event) => {
    event.preventDefault(); // prevents refreshing of page
    localStorage.removeItem('token');
    dispatch(logoutNow())
    console.log('Logging out')
  }

  return(
    <div className='NavBar'>
      { !isAuthenticated? (<div className='LoggedOutBar'>
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
      </div>) 
      : (<div className='LoggedInBar'>
        <NavLink
          to={'/users'}
          className='users-page-link'
        >
          <span>
            Users
          </span>
        </NavLink>
        <NavLink
          to={'/products'}
          className='products-page-link'
        >
          <span>
            Products
          </span>
        </NavLink>
        <NavLink
          to={'/cart'}
          className='cart-page-link'
        >
          <span>
            Cart
          </span>
        </NavLink>
        <span onClick={event => handleLogoutNow(event)} className='navbar-logout'>
          Logout
        </span>
      </div>)}
    </div>
  )
}

export default NavBar;