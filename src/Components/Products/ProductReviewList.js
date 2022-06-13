import '../../Style/App.css';
import ProductReview from './ProductReview';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../Features/routes';
import { Box, Text, List, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import ProductNewReviewButton from './ProductNewReviewButton';
import Loader from '../Loader';

function ProductReviewList(props) {

  // React/Redux State/Action Management.
  const reviewsData = useSelector((state) => state.reviewsData[props.productsId] || [])
  const reviewsDataIsLoading = useSelector((state) => state.reviewsData.dataIsLoading)
  const dispatch = useDispatch();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const borderColor = useColorModeValue('blue.500', 'blue.200');
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  

  useEffect(() => {
    const getData = async () => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
       audience: process.env.REACT_APP_AUTH0_AUDIENCE,
       scope: 'openid'
     })
      await dispatch(api.reviews.getReviews({token, products_id: props.productsId})) 
    }
    getData();
  }, [])

  if (reviewsDataIsLoading) {
    return <Loader />
  }
  
 
  return(
    <>
    { reviewsData.length > 0 &&
      <List
        className='review'
        flexWrap='wrap'
        display='flex'
        flexDirection='column'
        width={['90%','80%']}
        margin='0 auto'
        marginTop='0.75rem'
        marginBottom='1.5rem'
        paddingTop='0.5rem'
        paddingBottom='0.5rem'
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        borderRadius='8px'
      >
        {reviewsData.map((review, index) => (
          <ProductReview 
            review={review}
            key={index}
            id={`product-${review.id + 1}`}
          />   
        ))}
      </List> 
    } 
    { isAuthenticated && !(reviewsData.find((element) => element.user_email === user.email)) && <ProductNewReviewButton productsId={props.productsId}/> }  

    </> 
  )
}

export default ProductReviewList;