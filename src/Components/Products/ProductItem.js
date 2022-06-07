import '../../Style/App.css';
import * as React from 'react';
import { useEffect } from 'react';
import { api } from '../../Features/routes';
import { Box, Show, Hide, Text, Button, useColorModeValue } from '@chakra-ui/react'
import {NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import {ChevronRightIcon} from '@chakra-ui/icons';

function ProductItem() {

  // React/Redux State/Action Management.
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const borderColor = useColorModeValue('blue.500', 'blue.200');
  const { id } = useParams();
  const page = Number(useParams().page);
  let navigate = useNavigate();
  const product = useSelector((state) => state.productData.data.data[id-1-((page-1)*9)] || [])
  const cartData = useSelector((state) => state.cartData.cartProductsData)
  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  const themeColor = useColorModeValue('blue.500', 'blue.200');
  const discountRedColor = useColorModeValue('red.500', 'red.300');
  const discountGreenColor = useColorModeValue('green.500', 'green.300');
  const discountYellowColor = useColorModeValue('yellow.600', 'yellow.400');


  useEffect(() => {
    const getData = async () => {
      const token = process.env.REACT_APP_IN_DEVELOPMENT? 'dev token' :
      await getAccessTokenSilently({
       audience: process.env.REACT_APP_AUTH0_AUDIENCE,
       scope: 'openid'
     })
      if (isAuthenticated) await dispatch(api.cart.getCartProductsByEmail({ token, email: user.email }))
    }
    getData();

  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    const getData = async () => {
      await dispatch(api.products.getProductPage(page)) 
      // await dispatch(api.products.getProductPage(page)) 
    }
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps








  const addToCart = async () => {

    //Search if item has stock
    if (product.stock > 0) {
      const quantity = document.getElementById(`number-input-${id}`).value;
      const token = await getAccessTokenSilently({        
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: 'openid'
      })

      // create a new row if product doesn't already exist
      if ( cartData.length < 1  || !(cartData.find(element => element.id === Number(id))?.id === Number(id)) ) {
        await dispatch(api.cart.addProductToCart({user_email: user.email, products_id: Number(id), quantity: quantity }))
        dispatch(api.products.removeStock({id, quantity: quantity}))
      // update row if product already exists
      } else { 
         dispatch(api.products.removeStock({id, quantity: quantity}))
        await dispatch(api.cart.addQuantity({ quantity: quantity, products_id: Number(id), user_email: user.email }))
      }

      // update number of items in cart and navigate to products page while showing toast
      await dispatch(api.cart.getNumberOfCartItems({token, email: user.email}))
      await dispatch(api.cart.setAddToCartToastDisplayed(false))
      navigate(`/products/${page}`, {state: { product, quantity } } )
    }
  }

  

  return(
    <Box>
      <Breadcrumb  
        display='flex' 
        width={['90%','80%']}
        margin='0.5rem auto'
        paddingTop='0.25rem'
        separator={<ChevronRightIcon color='gray.500' />}
        className='breadcrumb'
        fontSize={['sm', 'md']}
      >
        <BreadcrumbItem  marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink  as={NavLink} to='/'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem >
        <BreadcrumbItem  marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink as={NavLink} to={`/products/${page}`}>
            Products ({`${page}`})
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage marginLeft='0' marginRight='0' marginBottom='0.25rem'>
          <BreadcrumbLink color={themeColor}>
            Product #{id}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    <Box
      width="100%"
      display='flex'
      justifyContent='center'
      margin='0 auto'
    >
      
      <Box
        className='product'
        display='flex'
        flexDirection='row'
        width={['90%','80%']}
        justifyContent='space-between'
        alignItems='center'
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        borderRadius='8px'
        margin='1rem'
      >
        <Box 
          className='product-description'
          display='flex'
          flexDirection='column'
          justifyContent='flex-start'
          textAlign='left'
          margin='1.25rem 1rem'
          width={['95%','95%','50%']}

        >
          <Box 
            className='product-name'
            fontSize={['sm', 'md']}
          >
            {product.name}
          </Box>
          <Box 
            className='product-name'
            marginTop='1rem'
            fontSize={['sm', 'md']}
          >
            {product.description} 
          </Box>
          <Show breakpoint='(max-width: 650px)'>
          <Box
            h='216px'
            w="288px"
            margin='0 auto'
            marginTop='1rem'
            rounded="lg"
            bgSize="cover"
            bgPos="center"
            style={{
              backgroundImage:
                `url(/images/${product.image_link}.png`
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
            Price:  
            { product.discount?
          <>
            <Text as='span' fontSize={['xs','sm']} textDecoration='line-through' color={discountRedColor}> {product.price.toFixed(2).replace('.', ',')}€</Text>
            <Text as='span' fontSize={['lg','xl']} color={discountGreenColor}>{(product.price*(1-(product.discount / 100))).toFixed(2).replace('.', ',')}€</Text>
            <Text as='span' fontSize={['sm','md']} color={discountYellowColor}>(-{product.discount}%)</Text>
          </>
          :
          <>
            <Text as='span' fontSize={['sm','md']} >{(product.price).toFixed(2).replace('.', ',')}€</Text>
          </>
          }
          </Box>
          <Box 
            className='product-stock'
            
            marginBottom='0.5rem'
            fontSize={['sm', 'md']}
          >
            Stock: {product.stock}
          </Box>

          {isAuthenticated? 
          <NumberInput 
            id={'number-input-'+id} 
            defaultValue={1} 
            min={1} 
            max={product.stock}
            marginBottom='0.75rem'
          >
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          : ''}
          {isAuthenticated? 
          <Button 
            colorScheme='blue' 
            width='144px'
            className='button'
            rightIcon={<BsCartPlus />}
            onClick={() => addToCart()}
          >
            Add to Cart
          </Button>
          : ''}
        </Box>
        <Hide breakpoint='(max-width: 650px)'>
        <Box
          h='216px'
          w="288px"
          marginRight='1.25rem'
          marginTop='1.25rem'
          marginBottom='1.25rem'
          rounded="lg"
          bgSize="cover"
          bgPos="center"
          style={{
            backgroundImage:
              `url(/images/${product.image_link}.png`
          }}
        >
        </Box>
        </Hide>
      </Box>
    </Box>
    </Box>
  )
}

export default ProductItem;