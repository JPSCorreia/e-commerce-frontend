

import '../Style/App.css';
import * as React from 'react';
import { Box } from '@chakra-ui/react'




function ToggleColorTheme() {


  return(
    <Box 
      className='toggle-color-theme-button'
      cursor='pointer'
      fontSize='md'
    > 
      Toggle Theme 
    </Box>
  )
}

export default ToggleColorTheme;