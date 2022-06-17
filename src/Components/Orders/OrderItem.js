import '../../Style/App.css';
import * as React from 'react';
import { Box, Flex, Hide, Show, ListItem, useColorModeValue } from '@chakra-ui/react'
import OrderReviewList from './OrderReviewList';
import { api } from '../../Features/routes';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import ProductNewReviewButton from '../Products/ProductNewReviewButton';

function OrderItem(props) {

  // React/Redux State/Action Management.
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const orderReviewData = useSelector((state) => state.orderReviewsData[props.orderId] || [])

  useEffect(() => {
    const getData = async () => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
       audience: process.env.REACT_APP_AUTH0_AUDIENCE,
       scope: 'openid'
     })
    }
    getData();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps



  return(
    <ListItem 
      id={props.id}
      className='order-item'
      display='flex'
      justifyContent='space-between'
      width={['90%','80%']}
      flexDirection='column'
      margin='1rem auto'
      borderColor={
        useColorModeValue('blue.500', 'blue.200')
      }
      borderRadius='8px'
      backgroundColor={backgroundColor}
    >
      <Flex 
       flexDirection='row'
      >
      <Box 
        className='product-description'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        textAlign='left'
        margin='1.25rem 1rem'
        width='100%'
      >
        <Box 
          className='product-name'
          fontSize={['sm', 'md']}
          fontWeight="bold"
        >
          {props.orderItem.name}
        </Box>
        <Box 
          className='product-name'
          marginTop='1rem'
          fontSize={['sm', 'md']}
        >
          {props.orderItem.description} 
        </Box>
        <Show breakpoint='(max-width: 650px)'>
          <Box
            h={['160px', '180px', '216px']}
            w={['220px', '240px', "288px"]}
            margin='0 auto'
            marginTop='1rem'
            rounded="lg"
            bgSize="cover"
            bgPos="center"
            style={{
              backgroundImage:
                `url(/images/${props.orderItem.image_link}.png`
            }}
          >
          </Box>
          </Show>
          <Box 
          className='product-price'
          marginTop='1rem'
          marginBottom='1rem'
          fontSize={['sm', 'md']}
        >
          Price per unit: {((props.orderItem.price -(props.orderItem.price * props.orderItem.discount/100))).toFixed(2).replace('.', ',')}€
        </Box>
        <Box 
          className='product-price'
          marginBottom='1rem'
          fontSize={['sm', 'md']}
        >
          Total: {((props.orderItem.price -(props.orderItem.price * props.orderItem.discount/100)) * props.orderItem.quantity).toFixed(2).replace('.', ',')}€
        </Box>
        <Box 
          className='product-quantity'
          // marginBottom='1rem'
          fontSize={['sm', 'md']}
        >
          Quantity: {props.orderItem.quantity}
        </Box>
        { !orderReviewData[props.index] && <ProductNewReviewButton orderId={props.orderId} productsId={props.orderItem.products_id} /> } 
      </Box>
      <Hide breakpoint='(max-width: 650px)'>
      <Box
        h={['170px', '180px', '180px', '230px']}
        w={["400px", "350px", '320px', "350px"]}
        marginRight='1.25rem'
        marginTop='1.25rem'
        marginBottom='1.25rem'
        rounded="lg"
        bgSize="cover"
        bgPos="center"
        style={{
          backgroundImage:
            `url(/images/${props.orderItem.image_link}.png`
        }}
      >
      </Box>
      </Hide>
      </Flex>
      
      { <OrderReviewList 
          orderId={props.orderId}
          productId={props.orderItem.product_id}
          index={props.index}
        />
      }
    </ListItem>
  )
}

export default OrderItem;