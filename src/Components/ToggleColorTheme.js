

import '../Style/App.css';
import * as React from 'react';
import { Text, Box, useColorMode, useColorModeValue } from '@chakra-ui/react'



function ToggleColorTheme() {
  const { toggleColorMode } = useColorMode()
  const hoverColor = useColorModeValue('blue.500', 'blue.200')

  return(
    <Box className='toggle-color-theme-button'>
      <Text 
        onClick={toggleColorMode} 
        _hover={{
            color: hoverColor
        }}>
        Theme
      </Text>     
    </Box>
  )
}

export default ToggleColorTheme;