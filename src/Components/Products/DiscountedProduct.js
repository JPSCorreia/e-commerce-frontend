import '../../Style/App.css';
import * as React from 'react';
import { Box, Flex, chakra, Button, Image, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { CgDetailsMore } from 'react-icons/cg'
import { NavLink } from 'react-router-dom';

function DiscountedProduct(props) {

  const discountGreenColor = useColorModeValue('green.500', 'green.300');
  const discountYellowColor = useColorModeValue('yellow.600', 'yellow.400');
  const backgroundColor2 = useColorModeValue("white", "gray.800")
  const backgroundColor3 = useColorModeValue("gray.200", "gray.700")
  const discountRedColor = useColorModeValue('red.500', 'red.300');

  return(
      <Flex
        // p={50}
        // w="full"
        alignItems="center"
        justifyContent="center"
        shadow="lg"
        rounded="lg"
        className='product'
        borderRadius='0 0 8px 8px'
        flexDirection='column'
        mt="1.5rem"
      >
        <Box bg={discountYellowColor} w='100%' roundedTop="lg" >
        <Heading  fontWeight="bold"  m='0' fontSize={['xl', '2xl']} color={backgroundColor3} mt='0.25rem' mb='0.25rem'>
          {props.product.discount}% Off
        </Heading>
        </Box>
        <Box
          maxW="xs"
          mx="auto"
          // bg="white"
          // _dark={{
          //   bg: "gray.800",
          // }}
          roundedBottom="lg"
          bg={backgroundColor3}
        
        >
          <Box px={4} py={2}>
            <chakra.h1
              color="gray.800"
              _dark={{
                color: "white",
              }}
              fontWeight="bold"
              fontSize="2xl"
              textTransform="uppercase"
            >
              {props.product.description}
            </chakra.h1>
            <chakra.p
              mt={1}
              fontSize="xs"
              color="gray.600"
              _dark={{
                color: "gray.400",
              }}
            >
              {props.product.name}
            </chakra.p>
          </Box>
            
          <Image
            h={64}
            w="90%"
            fit="cover"
            mt={2}
            mb={2}
            ml={3}
            src={`/images/${props.product.image_link}.png`}
            alt="product image"
          />

          <Flex
            alignItems="center"
            justifyContent="space-around"
            px={4}
            py={2}
            bg={backgroundColor2}
            roundedBottom="lg"
            // borderRadius='0 0 8px 8px'
            
          >
            <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
              <Flex>
                <Text as='span' fontSize={['sm', 'md']}  textDecoration='line-through' color={discountRedColor}>{props.product.price.toFixed(2).replace('.', ',')}€</Text>
                <Text as='span' fontSize={['xl', '2xl']} ml={2} color={discountGreenColor}>{(props.product.price*(1-(props.product.discount / 100))).toFixed(2).replace('.', ',')}€</Text>
              </Flex>
            </chakra.h1>
            <NavLink
              to={`/products/${Math.ceil(props.product.id / 9)}/item/${props.product.id}`}
              state={{ product: props.product }}
              className='products-page-link'
            >
              <Button 
                className='button' 
                colorScheme='blue'
                size='sm'
                rightIcon={<CgDetailsMore />}
              >
                Details
              </Button>
            </NavLink>
          </Flex>
        </Box>
      </Flex>
  )
}

export default DiscountedProduct;
















