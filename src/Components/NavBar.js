import '../Style/App.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Text, useColorModeValue, Avatar, useColorMode, Image, Icon, } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup
} from '@chakra-ui/react'
import { IoCartOutline } from 'react-icons/io5';
import { MdLogout } from "react-icons/md";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { BsPersonCircle } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import SearchBar from './SearchBar'


function NavBar() {

  // Redux State/Action Management.
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();
  const themeColor = useColorModeValue('blue.500', 'blue.200')
  const { toggleColorMode } = useColorMode()
  const numberOfCartItems = useSelector((state) => state.cartData.numberOfCartItems)
  const { colorMode } = useColorMode()
  const themeColorNavBar = useColorModeValue('gray.200', 'gray.700')

  
  return(
    <Box 
      className={(colorMode === 'light')? 'top-bar-light' : 'top-bar-dark' }
      display='flex'
      fontSize='1.25rem'
      padding='0.25rem 0'
      paddingBottom='0.4rem'
      justifyContent='space-between'
      alignItems='center'
      // borderBottom='1px solid'      
      borderColor={themeColor}
      bgColor={themeColorNavBar}
      flexShrink='0'
    >
      <Box 
        className='nav-bar' 
        display='flex'
      >
          <NavLink
            to={'/'}
            className='home-page-link'
          >
        <Image 
          className='navbar-logo' 
          src={(colorMode === 'light')? '/images/emporium-light.png' : '/images/emporium-dark.png'}
          minWidth='160px'
          maxWidth='160px'
          marginLeft='0.75rem'
          borderRadius='4px'
        />
          </NavLink>
        
        <Text 
          as='span'
          margin='auto 1rem'
          marginLeft='1.5rem'
          fontSize='2xl'
          fontFamily
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
      <SearchBar />
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
          <Box display='flex' marginTop='0.25rem'>

          <Text 
            fontSize='md'
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
              <Icon
                as={IoCartOutline} 
                className='react-icon' 
                margin='auto 0'
              />
              <Text 
                className='profile-cart-number' 
                fontSize='sm'
              >
                {numberOfCartItems}
              </Text>
            </Box>
          </NavLink>
          <Menu>
          <MenuButton 
            className='profile-avatar'
            marginRight='1rem'
            padding='0'
          >
            <Avatar 
              name={user.nickname} 
              src={user.picture} 
              size='sm' 
            />
          </MenuButton>
          <MenuList
          
          >
          <MenuGroup 
            title='Signed in as'
            margin='0'
            marginLeft='0.8rem'
            textAlign='left'
            fontSize='xs'
          >
            <Text 
              className='profile-name'
              fontSize='2l'
              marginLeft='0.8rem'
              textAlign='left'
              fontWeight='extrabold'
            >
              {user.nickname}

            </Text>
          </MenuGroup>
          <MenuDivider />
          <NavLink
              to={'/profile'}
              className='profile-page-link'
            >
            <MenuItem
              _hover={{
                color: themeColor
              }} 
              fontSize='md'
              icon={<BsPersonCircle />}
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
                fontSize='md'
                icon={<FaUsers />}
              >
               Users
              </MenuItem>
            </NavLink>
            <MenuItem
              onClick={toggleColorMode} 
              _hover={{
                color: themeColor
              }} 
              fontSize='md'
              icon={(colorMode === 'light')? <MoonIcon /> : <SunIcon />}
            >
              Change Theme
            </MenuItem>
            <MenuItem
              _hover={{
                color: themeColor
              }} 
              onClick={() => logout({ returnTo: window.location.origin })}
              fontSize='md'
              icon={<MdLogout />}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>

        </Box>
          )}
          </>
        )}
        
      </Box>
    </Box>
  )
}

export default NavBar;