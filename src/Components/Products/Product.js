import '../../Style/App.css';
import * as React from 'react';
import { Box, Button, ListItem, useColorModeValue, Text, chakra, Flex } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import { CgDetailsMore } from 'react-icons/cg'


function Product(props) {

  const backgroundColor = useColorModeValue('gray.100', 'gray.600');
  const discountGreenColor = useColorModeValue('green.500', 'green.300');
  const discountYellowColor = useColorModeValue('yellow.600', 'yellow.400');
  const headingColor = useColorModeValue("gray.800", "white")
  const backgroundColor2 = useColorModeValue("white", "gray.800")
  const backgroundColor3 = useColorModeValue("gray.200", "gray.700")
  const textColor = useColorModeValue("gray.800", "gray.200")

  return(
    <ListItem 
      className='product'
      id={props.id}
      borderRadius='8px'
      backgroundColor={backgroundColor}
      flexBasis='31.2%'
      margin='0'
      marginTop='1rem'
      marginBottom='1rem'
      marginLeft='1rem'
      marginRight='1rem'
      maxWidth='100%'
    >
      <Flex
        bg={backgroundColor}
        marginTop='1.75rem'
        marginBottom='1.5rem'
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          w="sm"
          mx="auto"
        >
          <Box
            h={64}
            w="full"
            rounded="lg"
            bgSize="cover"
            bgPos="center"
            style={{
              backgroundImage:
                // "url(https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)",
                `url(/images/${props.product.image_link}.png`
            }}
          >
          </Box>
          <Box
            w={{ base: 56, md: 64 }}
            bg={backgroundColor2}
            mt={-10}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
          >
            <chakra.h3
              py={2}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color={headingColor}
              letterSpacing={1}
              fontSize={['sm', 'md']}
            >
              {props.product.description}
            </chakra.h3>
            <Flex
              alignItems="center"
              justifyContent="space-around"
              py={2}
              px={3}
              bg={backgroundColor3}
            >
              <chakra.span
                fontWeight="bold"
                color={textColor}
              >
                <Box 
                  className='product-price'
                  // marginTop='1rem'
                  // marginBottom='1rem'
                  fontSize={['md', 'xl']}
                >
                Price: { props.product.discount?
                  <Box display='flex'>
                    <Text as='span' fontSize={['md', 'lg']} color={discountGreenColor}>{(props.product.price*(1-(props.product.discount / 100))).toFixed(2).replace('.', ',')}€</Text>
                    <Text as='span' fontSize={['xs', 'sm']} color={discountYellowColor}>(-{props.product.discount}%)</Text>
                  </Box>
                :
                  <Box>
                    <Text fontSize={['md', 'lg']}>{(props.product.price).toFixed(2).replace('.', ',')}€</Text>
                  </Box>
                }
                </Box>
              </chakra.span>
              <NavLink
                to={props.fromSearch? `products/item/${props.product.id}`: `item/${props.product.id}`}
                state={{ product: props.product }}
                className='products-page-link'
              >
                <Button 
                  className='button' 
                  colorScheme='blue'
                  marginLeft='0.25rem'
                  size='sm'
                  rightIcon={<CgDetailsMore />}
                >
                  Details
                </Button>
              </NavLink>
            </Flex>
            
          </Box> 
        </Flex> 
      </Flex>
    </ListItem>
  )
}

export default Product;