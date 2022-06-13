import '../../Style/App.css';
import { useSelector } from 'react-redux';
import { Box, Flex, Text, ListItem, Icon, useColorModeValue } from '@chakra-ui/react'
import ReactStars from "react-rating-stars-component";
import { useAuth0 } from "@auth0/auth0-react";
import ProductEditReviewButton from './ProductEditReviewButton';

function ProductReview(props) {

  // React/Redux State/Action Management.
  const borderColor = useColorModeValue('blue.500', 'blue.200');
  const backgroundColor = useColorModeValue("white", "gray.800")
  const { user, isAuthenticated } = useAuth0();

  return(
    <ListItem 
      className='review'
      width={["95%", "96%", "97%", "98%"]}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      borderRadius='8px'
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      margin='0 auto'
      marginTop='0.5rem'
      marginBottom='0.75rem'
    >  
      <Flex ml='0.75rem' mt='0.5rem' justifyContent='start' >
        <Text fontSize='1.25rem' mr='1rem' >
          {props.review.full_name}
        </Text>
        <ReactStars
          count={5}
          value={props.review.rating}
          edit={false}
          size={18}
          color2={'#ffd700'} 
        />
      </Flex>

      <Text mt='0.75rem' ml='0.75rem' mb='0.5rem' textAlign='start'>{props.review.comment}</Text>
      { isAuthenticated && props.review.user_email === user.email && <ProductEditReviewButton review={props.review} productsId={props.review.products_id}/>}
    </ListItem>
  )
}

export default ProductReview;