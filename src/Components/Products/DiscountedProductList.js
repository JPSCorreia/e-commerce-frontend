import '../../Style/App.css';
import * as React from 'react';
import { List, Box, Heading } from '@chakra-ui/react'
import DiscountedProduct from './DiscountedProduct';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../Features/routes';

function DiscountedProductList() {

  //TODO: get 3 top discounted products, show all 3 in big screen, 2 in tablet, 1 in phone
  //TODO: do sql query to find products with highest discount and limit by 3

  // React/Redux State/Action Management.
  const discountedProductData = useSelector((state) => state.productData.discountedProducts)
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(api.products.getMostDiscountedProducts(3))
    }
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

   console.log(discountedProductData)

  return(
    <Box 
      className='product-list'
      mt='3.5rem'
    >
      <Heading>
        Our Best Deals
      </Heading>
      <List
        flexWrap='wrap'
        display='flex'
        flexDirection='row'
        justifyContent='space-around'
        width={['90%','80%']}
        margin='0 auto'
        mb='1.5rem'
      >
      {discountedProductData?.map((product, index) => (
          <DiscountedProduct 
            product={product}
            key={index}
            id={`discounted-product-${product.id + 1}`}
          />   
        ))}
      </List>
    </Box>
    )
}

export default DiscountedProductList;