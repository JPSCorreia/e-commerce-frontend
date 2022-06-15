import '../../Style/App.css';
import OrderReview from './OrderReview';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../Features/routes';
import { List, Text, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import ProductNewReviewButton from '../Products/ProductNewReviewButton';
import Loader from '../Loader';


function OrderReviewList(props) {

  // React/Redux State/Action Management.

  const orderReviewData = useSelector((state) => state.orderReviewsData[props.orderId] || [])
  const orderReviewsDataIsLoading = useSelector((state) => state.orderReviewsData.dataIsLoading)

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
     await dispatch(api.orderReviews.getReviews({ token: token, order_id: props.orderId, user_email: user.email }))
    }
    getData();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (orderReviewsDataIsLoading) {
    return <Loader />
  }



  return(
    <>
    { orderReviewData[props.index] &&
      <List
        className='review'
        flexWrap='wrap'
        display='flex'
        flexDirection='column'
        // width={['90%','80%']}
        width='97%'
        margin='0 auto'
        marginTop='0.75rem'
        marginBottom='1.5rem'
        paddingTop='0.5rem'
        paddingBottom='0.5rem'
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        borderRadius='8px'
        padding='0'
      >
        
        { orderReviewData[props.index] &&
          <>
            <Text fontSize={['sm', 'md', 'lg']}>Your Review</Text>
            <OrderReview 
              orderId={props.orderId}
              review={orderReviewData[props.index]}
            /> 
          </>  
        }
      </List> 
    } 
     

    </> 
  )
}

export default OrderReviewList;