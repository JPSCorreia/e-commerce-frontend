import '../Style/App.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Text, useColorModeValue} from '@chakra-ui/react'
import ToggleColorTheme from './ToggleColorTheme';


function NavBar() {

  // const backendURL = process.env.REACT_APP_IN_DEVELOPMENT ? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_PUBLIC_BACKEND_URL 

  // Redux State/Action Management.
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value)
  const hoverColor = useColorModeValue('blue.500', 'blue.200')

  return(
    <Box 
      className='top-bar'       
      borderColor={ useColorModeValue('blue.500', 'blue.200')}
    >
      <Box className='nav-bar'>
        { !isAuthenticated? (<Box className='LoggedOutBar'>
          <Text
            as='a'
            _hover={{
              color: hoverColor
            }}
            className="App-link"
            href={`/auth/login`}
          >
          <Text 
              as='span'
              _hover={{
                color: hoverColor
              }}
          >
            Sign In
          </Text>
        </Text>
        </Box>) 
        : (<Box className='LoggedInBar'>
          <NavLink
            to={'/users'}
            className='users-page-link'
          >
            <Text 
              as='span'
              _hover={{
                color: hoverColor
              }}
            >
              Users
            </Text>
          </NavLink>
          <NavLink
            to={'/products'}
            className='products-page-link'
          >
            <Text 
              as='span'
              _hover={{
                color: hoverColor
              }}
            >
              Products
            </Text>
          </NavLink>
          <NavLink
            to={'/cart'}
            className='cart-page-link'
          >
            <Text 
              as='span'
              _hover={{
                color: hoverColor
              }}
            >
              Cart
            </Text>
          </NavLink>
          <NavLink
            to={'/orders'}
            className='orders-page-link'
          >
            <Text 
              as='span'
              _hover={{
                color: hoverColor
              }}
            >
              Orders
            </Text>
          </NavLink>
          <Text 
          as='a'
          _hover={{
            color: hoverColor
          }}
          className="App-link"
          href={`/auth/logout`}
        >
          <Text 
            as='span'
            _hover={{
              color: hoverColor
            }}
          >
            Sign Out
          </Text>
        </Text>
        </Box>)}
      </Box>
      <ToggleColorTheme />
    </Box>
  )
}

export default NavBar;