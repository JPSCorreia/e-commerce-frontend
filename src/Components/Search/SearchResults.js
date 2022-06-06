import '../../Style/App.css';
import { useSelector } from 'react-redux';
import Product from '../Products/Product';
import { Box, List } from '@chakra-ui/react'


function SearchResults(props) {

  // React/Redux State/Action Management.
  const searchResults = useSelector((state) => state.productData.searchResults.data)
  console.log(searchResults)

  return (
    <Box 
      className='product-list'
    >
      <List
        flexWrap='wrap'
        display='flex'
        flexDirection='row'
        borderRadius='20px'
        width='80%'
        margin='0 auto'
        justifyContent='flex-start'
      >
     {searchResults?.map((product, index) => (
          <Product 
            searchString={props.searchString}
            fromSearch
            product={product}
            key={index}
            id={`product-${product.id + 1}`}
          />   
        ))}
        </List>      
    </Box>
  )
}

export default SearchResults;