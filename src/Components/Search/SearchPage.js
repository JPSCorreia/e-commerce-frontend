import '../../Style/App.css';
import { NavLink } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import {ChevronRightIcon} from '@chakra-ui/icons';
import SearchResults from './SearchResults';
import { useParams } from "react-router-dom";
import { api } from '../../Features/routes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function SearchPage() {

  const dispatch = useDispatch();
  // const searchResults = useSelector((state) => state.productData.searchResults.data)
  const themeColor = useColorModeValue('blue.500', 'blue.200');
  const { searchString } = useParams();

  useEffect(() => {
    const getData = async () => {
      await dispatch(api.products.getSearchResults(searchString.toLowerCase()))
    }
    getData();
  }, [searchString]); // eslint-disable-line react-hooks/exhaustive-deps



  return(
    <Box className='search-page' >
      <Breadcrumb  
        display='flex' 
        width='80%' 
        margin='0.5rem auto'
        paddingTop='0.25rem'
        separator={<ChevronRightIcon color='gray.500' />}
        className='breadcrumb'
      >
        <BreadcrumbItem  marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink  as={NavLink} to='/'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem >
        <BreadcrumbItem isCurrentPage marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink color={themeColor}>
            Search ({searchString})
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <SearchResults 
        searchString={searchString}
      />
    </Box>
  )
}

export default SearchPage;