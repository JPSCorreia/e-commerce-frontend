
import '../Style/App.css';
import * as React from 'react';
import { Box, useColorModeValue, useColorMode, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

function SearchBar() {

  const { colorMode } = useColorMode()
  const borderColor = useColorModeValue('gray.500', 'gray.200')
  const textColor = useColorModeValue('gray.700', 'gray.100')
  const iconColor = useColorModeValue('gray.700', 'gray.300')
  const focusBorderColor = useColorModeValue('blue.500', 'blue.200');
  const backgroundColor = useColorModeValue('whiteAlpha.700', 'gray.800');

  return(
    <Box width='75%' marginRight='0.5rem'>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color={iconColor} />}
        />
        <Input 
          placeholder='Search' 
          color={textColor} 
          borderColor={borderColor}
          backgroundColor={backgroundColor}
          focusBorderColor={focusBorderColor}
          _hover={{
            borderColor: '',
          }}
          _placeholder={(colorMode === 'light')? {opacity: 0.6, color: 'black' }: {opacity: 0.8, color: 'white'} }
        />
      </InputGroup>
    </Box>
  )
}

export default SearchBar;




