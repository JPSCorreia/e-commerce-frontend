import '../Style/App.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Text, useColorModeValue, Avatar, useColorMode, Image, Icon } from '@chakra-ui/react'
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
import { useEffect } from 'react';


function NavBar() {


  // Redux State/Action Management.
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();
  const themeColor = useColorModeValue('blue.500', 'blue.200')
  const { toggleColorMode } = useColorMode()
  const numberOfCartItems = useSelector((state) => state.cartData.numberOfCartItems)
  const { colorMode } = useColorMode()



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
          src={`/images/emporium.png`}
          width='64px'
          marginLeft='1rem'
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
              Toggle Theme 
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

        </>
          )}
          </>
        )}
        
      </Box>
    </Box>
  )
}

export default NavBar;