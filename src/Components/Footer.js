import '../Style/App.css';
import * as React from 'react';
import { Box, Text, useColorModeValue, Icon, Link } from '@chakra-ui/react'
import { SiGithub, SiNodedotjs, SiReact, SiRedux, SiAuth0 } from "react-icons/si";

function Footer() {

  // Redux State/Action Management.

  const themeColor = useColorModeValue('blue.500', 'blue.200')
  const themeColorNavBar = useColorModeValue('gray.200', 'gray.700')

  return(
    <Box 
      className='footer' 
      display='flex'
      fontSize='xl'
      justifyContent='space-between'
      alignItems='center'
      borderColor={themeColor}
      bgColor={themeColorNavBar}
      flexShrink='0'
      marginTop='0'
    >
     <Text
      fontSize='sm'
      margin
      marginTop='0.65rem'
      marginBottom='0.65rem'
      marginLeft='1.5rem'
      textAlign='left'
     >
     © 2022, Emporium Inc. and its affiliates
     </Text>
     <Box display='flex' marginRight='1rem'>
     <Link href='https://github.com/JPSCorreia/e-commerce-frontend' display='flex'>
      <Icon as={SiGithub} className='react-icon' />
      </Link>
      <Link href='https://reactjs.org/' display='flex'>
      <Icon as={SiReact} className='react-icon' color='#61dafb' />
      </Link>
      <Link href='https://redux-toolkit.js.org' display='flex'>
      <Icon as={SiRedux} className='react-icon' color='#764abc' />
      </Link>
      <Link href='https://auth0.com' display='flex'>
      <Icon as={SiAuth0} className='react-icon'color='#eb5424' />
      </Link>
      <Link href='http://github.com' display='flex'>
      <Icon as={SiNodedotjs} className='react-icon' color='#43853d' />
      </Link>
     </Box>
     
    </Box>
  )
}

export default Footer;