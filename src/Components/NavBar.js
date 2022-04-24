import '../Style/App.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


function NavBar() {

  // Redux State/Action Management.
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value)

  return(
    <div className='NavBar'>
      { !isAuthenticated? (<div className='LoggedOutBar'>
        <a
        className="App-link"
        href={"/auth/login"}
      >
        <span>
          Sign In
        </span>
      </a>
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
        <NavLink
          to={'/orders'}
          className='orders-page-link'
        >
          <span>
            Orders
          </span>
        </NavLink>
        <a
        className="App-link"
        href={"/auth/logout"}
      >
        <span>
          Sign Out
        </span>
      </a>
      </div>)}
    </div>
  )
}

export default NavBar;