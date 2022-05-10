

import '../Style/App.css';
import * as React from 'react';
import { Box, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'



function ToggleColorTheme() {
  const { colorMode } = useColorMode()

  return(
    <Box className='toggle-color-theme-button'> 
      {(colorMode === 'light')? 
        <div>Toggle Theme <MoonIcon className='toggle-color-theme-icon'/> </div> : <div>Toggle Theme <SunIcon className='toggle-color-theme-icon'/> </div>
      }
    </Box>
  )
}

export default ToggleColorTheme;