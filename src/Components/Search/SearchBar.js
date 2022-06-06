import '../../Style/App.css';
import { Box, useColorModeValue, useColorMode, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useParams, useNavigate } from "react-router-dom";
import { api } from '../../Features/routes';
import { useState } from 'react';

function SearchBar() {

  const navigate = useNavigate();
  const { colorMode } = useColorMode()
  const borderColor = useColorModeValue('gray.500', 'gray.200')
  const textColor = useColorModeValue('gray.700', 'gray.100')
  const iconColor = useColorModeValue('gray.700', 'gray.300')
  const focusBorderColor = useColorModeValue('blue.500', 'blue.200');
  const backgroundColor = useColorModeValue('whiteAlpha.700', 'gray.800');
  const [searchString, setSearchString] = useState('')

  const handleSubmit = async (e) => {
    navigate(`/search/${searchString}`)
  }

  const handleChange = (e) => {
    // navigate(`/products/${page}`, {state: { product, quantity } } )
    setSearchString(e.target.value)
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if ((e.charCode === 13) && e.target.value !== '') {
      handleSubmit(e);
    }
  };

  return(
    <Box width='79%' marginRight='0.5rem'>
      <InputGroup>
      <InputLeftElement
         children={<SearchIcon color={iconColor} />}
         cursor='pointer'
        />
        <Input 
          placeholder='Search' 
          color={textColor} 
          borderColor={borderColor}
          backgroundColor={backgroundColor}
          focusBorderColor={focusBorderColor}
          onKeyPress={handleKeypress}
          onChange={handleChange}
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




