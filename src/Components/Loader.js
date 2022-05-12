import '../Style/App.css';
import * as React from 'react';
import { Spinner, useColorModeValue } from '@chakra-ui/react'

function Loader() {

  const spinnerColor = useColorModeValue('blue.500', 'blue.200');
  const emptySpinnerColor = useColorModeValue('gray.200', 'gray.700');

  return(
    <div className='loading-spinner'>
      <Spinner 
        size='xl'
        thickness='4px'
        speed='0.65s'
        label='loading'
        emptyColor={emptySpinnerColor}
        color={spinnerColor}
      />
    </div>
  )
}

export default Loader;