import '../Style/App.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Hide, Text, Flex, useColorModeValue, Avatar, useColorMode, Image, Icon } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup
} from '@chakra-ui/react'
import { chakra } from "@chakra-ui/react"
import { IoCartOutline } from 'react-icons/io5';
import { MdLogout } from "react-icons/md";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { BsPersonCircle } from "react-icons/bs";
import { BsBorderWidth } from "react-icons/bs";
import SearchBar from './Search/SearchBar'
import { useDispatch } from 'react-redux';
import { api } from '../Features/routes';
import { useEffect } from 'react';


function NavBar() {

  // Redux State/Action Management.
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();
  const themeColor = useColorModeValue('blue.500', 'blue.200')
  const { toggleColorMode } = useColorMode()
  const numberOfCartItems = useSelector((state) => state.cartData.numberOfCartItems)
  const { colorMode } = useColorMode()
  const themeColorNavBar = useColorModeValue('gray.200', 'gray.700')
  const corsData = useSelector((state) => state.userData.testCors)
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getData = async () => {
      await dispatch(api.users.testCors()) 
    }
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return(
    <Box 
      className={(colorMode === 'light')? 'top-bar-light' : 'top-bar-dark' }
      display='flex'
      fontSize='1.25rem'
      padding='0.25rem 0'
      paddingBottom='0.6rem'
      paddingTop='0.6rem'
      justifyContent='space-between'
      alignItems='center'    
      borderColor={themeColor}
      bgColor={themeColorNavBar}
      flexShrink='0'
    >
      
      <Box 
        className='nav-bar' 
        display='flex'
      >
        <Hide breakpoint='(max-width: 550px)'>
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
          margin='auto 0'
          marginLeft='1.5rem'
          fontSize={[ "sm", "md", "xl", "2xl" ]}
          fontWeight="bold"
          fontFamily
          textDecoration='none'
          _hover={{
            color: themeColor,
            transition: '0.2s',
          }}
        >
          <NavLink
            to={'/products/1'}
            className='products-page-link'
            
          >
            Browse
          </NavLink>
        </Text>
        <h1>tem de mostrar:</h1>
        </Hide>
      </Box>
      <SearchBar />
      <Box 
        className = 'navbar-right'
        display='flex'
      >
        {(!isAuthenticated && !isLoading)? (
          <Text 
            as='span'
            margin='auto 0'
            textDecoration='none'
            className="app-link"
            marginRight='1rem'
            fontSize={[ "sm", "md", "xl", "2xl" ]}
            fontWeight="bold"
            _hover={{
              color: themeColor,
              transition: '0.2s',
            }}
            onClick={() => loginWithRedirect()}
          > 
            Login
          </Text>) : 
          (
          <>
          { isLoading? '' : 
          (
          <Box display='flex' >         
          <NavLink
            to={'/cart'}
            className='cart-page-profile-link'
          >
            <Flex
              display='flex'
              _hover={{
                color: themeColor,
                transition: '0.2s'
              }}
              className='profile-cart'
              padding='0'
              paddingRight='1.1rem'
              paddingLeft='0.15rem'
              cursor='pointer'
              margin='0 auto'
              paddingTop='1rem'
            >
              <chakra.span pos="relative" display="inline-block">
                <Icon
                as={IoCartOutline} 
                boxSize={6}
                className='react-icon' 
                margin='auto 0'
                />
                { (numberOfCartItems > 0)?
                <chakra.span
                  pos="absolute"
                  top="-2px"
                  right="-2px"
                  px={2}
                  py={1}
                  fontSize="xs"
                  fontWeight="bold"
                  lineHeight="none"
                  color={(colorMode === 'light')? 'white' : 'black'}
                  transform="translate(50%,-50%)"
                  bg={(colorMode === 'light')? 'blue.500' : 'blue.200'}
                  rounded="full"
                >
                  {numberOfCartItems}
                </chakra.span>
                : ''}
              </chakra.span>
            </Flex>
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
              to={'/orders'}
              className='orders-page-link'
            >
              <MenuItem
                _hover={{
                  color: themeColor
                }} 
                fontSize='md'
                icon={<BsBorderWidth />}
              >
               Orders
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