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

  if (isLoading) {
    return '';
  }

  return(
    <Box 
      className='top-bar' 
      display='flex'
      fontSize='1.25rem'
      padding='0.25rem 0'
      justifyContent='space-between'
      alignItems='center'
      borderBottom='1px solid'      
      borderColor={themeColor}
    >
      <Box 
        className='nav-bar' 
        display='flex'
      >
        <Image 
          className='navbar-logo' 
          src={`/images/ecommerce.png`}
          width='32px'
        />
        <Text 
          as='span'
          margin='auto 1rem'
          textDecoration='none'
          _hover={{
            color: themeColor,
            transition: '0.2s',
          }}
        >
          <NavLink
            to={'/products'}
            className='products-page-link'
          >
            Browse
          </NavLink>
        </Text>
      </Box>
      <Box 
        className = 'navbar-right'
        display='flex'
      >
        {(!isAuthenticated && !isLoading)? (
          <Text 
            as='span'
            margin='auto 0.5rem'
            textDecoration='none'
            className="app-link"
            _hover={{
              color: themeColor,
              transition: '0.2s',
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
          <Text 
            fontSize='sm'
            _hover={{
              color: themeColor,
              transition: '0.2s'
            }}
            margin='auto 0.5rem'
          >
            <NavLink
              to={'/orders'}
              className='orders-page-profile-link'
            >
              Orders
            </NavLink>
          </Text>
          <NavLink
            to={'/cart'}
            className='cart-page-profile-link'
          >
            <Box 
              display='flex'
              _hover={{
                color: themeColor,
                transition: '0.2s'
              }}
              className='profile-cart'
              marginRight='0.4rem'
              cursor='pointer'
              alignItems='center'
              justifyContent='center'
            >      
              <IoCartOutline 
                className='react-icon' 
              />
              <Text 
                className='profile-cart-number' 
                fontSize='sm'
              >
                {numberOfItems? numberOfItems : '0'}
              </Text>
            </Box>
          </NavLink>
          <Menu >
          <MenuButton 
            className='profile-avatar'
            marginRight='0'
            padding='0'
          >
            <Avatar 
              name={user.nickname} 
              src={user.picture} 
              size='sm' 
            />
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
            margin='auto 0.5rem'
            textDecoration='none'
            className='profile-name'
            fontSize='sm'
            paddingLeft='0.25rem'
            paddingRight='0.25rem'
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