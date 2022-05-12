import '../Style/App.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Text, useColorModeValue, Avatar, useColorMode, Image } from '@chakra-ui/react'
import ToggleColorTheme from './ToggleColorTheme';
import { useSelector } from 'react-redux';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { IoCartOutline } from 'react-icons/io5';

function NavBar() {

  // Redux State/Action Management.
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();
  const themeColor = useColorModeValue('blue.500', 'blue.200')
  const { toggleColorMode } = useColorMode()
  const numberOfItems = useSelector((state) => state.cartItems.numberOfItems)

  console.log(`isAuthenticated ${isAuthenticated}`)
  console.log(`isLoading ${isLoading}`)
  if (isLoading) {
    return '';
  }

  return(
    <Box 
      className='top-bar'       
      borderColor={themeColor}
    >
      
      <Box className='nav-bar' display='flex'>
        <Image className='navbar-logo' src={`/images/ecommerce.png`}/>
        <NavLink
          to={'/products'}
          className='products-page-link'
        >
          <Text 
            as='span'
            _hover={{
              color: themeColor
            }}
          >
            Browse
          </Text>
        </NavLink>
      </Box>
      <Box className = 'navbar-right'>
        { (!isAuthenticated && !isLoading)? (
          <Text 
            as='span'
            className="app-link"
            _hover={{
              color: themeColor
            }}
            onClick={() => loginWithRedirect()}
          > 
            Log In
          </Text>) : 
          (
          <>
          { isLoading? '' : 
          (
          <>
          <NavLink
            to={'/orders'}
            className='orders-page-profile-link'
          >
            <Text fontSize='sm'>
              Orders
            </Text>
          </NavLink>
          <NavLink
            to={'/cart'}
            className='cart-page-profile-link'
          >
            <Box 
              display='flex'
              _hover={{
                color: themeColor
              }}
              className='profile-cart'
            >      
              <IoCartOutline 
                className='react-icon' 
              />
              <Text className='profile-cart-number' fontSize='sm'>{numberOfItems? numberOfItems : '0'}</Text>
            </Box>
          </NavLink>
          <Menu >
          <MenuButton className='profile-avatar'>
            <Avatar name={user.nickname} src={user.picture} size='sm' />
          </MenuButton>
          <MenuList>
          <NavLink
              to={'/profile'}
              className='profile-page-link'
            >
            <MenuItem
              _hover={{
                color: themeColor
              }} 
            >
             Profile
            </MenuItem>
          </NavLink>
            <NavLink
              to={'/users'}
              className='users-page-link'
            >
              <MenuItem
                _hover={{
                  color: themeColor
                }} 
              >
               Users
              </MenuItem>
            </NavLink>
            <MenuItem
              onClick={toggleColorMode} 
              _hover={{
                color: themeColor
              }} 
            >
             <ToggleColorTheme />
            </MenuItem>
            <MenuItem
              _hover={{
                color: themeColor
              }} 
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
        <Text 
            as='span'
            className='profile-name'
            fontSize='sm'
          >
            {user.nickname}
          </Text>
        </>
          )}
          </>
        )}
        
      </Box>
    </Box>
  )
}

export default NavBar;