import '../Style/App.css';
import * as React from 'react';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react'

function Loader() {

  const spinnerColor = useColorModeValue('blue.500', 'blue.200');
  const emptySpinnerColor = useColorModeValue('gray.200', 'gray.700');

  return(
    <Box 
      className='loading-spinner'
      display='flex'
      justifyContent='center'
      alignItems='center'
      textAlign='center'
      minHeight='90vh'
    >
      <Spinner 
        size='xl'
        thickness='4px'
        speed='0.65s'
        label='loading'
        emptyColor={emptySpinnerColor}
        color={spinnerColor}
      />
    </Box>
  )
}

export default Loader;