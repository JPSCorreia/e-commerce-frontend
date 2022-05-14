

import '../Style/App.css';
import * as React from 'react';
import { Box, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'



function ToggleColorTheme() {
  const { colorMode } = useColorMode()

  return(
    <Box 
      className='toggle-color-theme-button'
      cursor='pointer'
      marginRight='0.25rem'
    > 
      {(colorMode === 'light')? 
        <div>
          Toggle Theme 
          <MoonIcon 
            className='toggle-color-theme-icon'
            marginLeft='0.5rem'
            marginBottom='0.25rem'
          /> 
        </div> : 
        <div>
          Toggle Theme 
          <SunIcon 
            className='toggle-color-theme-icon'
            marginLeft='0.5rem'
            marginBottom='0.25rem'
          /> 
        </div>
      }
    </Box>
  )
}

export default ToggleColorTheme;