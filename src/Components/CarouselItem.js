import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';


function CarouselItem(props) {

  const discountRedColor = useColorModeValue('red.500', 'red.300');
  const discountGreenColor = useColorModeValue('green.500', 'green.300');
  const discountYellowColor = useColorModeValue('yellow.600', 'yellow.400');

  return(
    <Box>
    {/* <Text fontWeight="bold" fontSize={['2xl', '4xl']} >{props.product.description}</Text> */}
    <Box  
      overflow='hidden'   
    >
      <NavLink
        to={`products/1/item/${props.product.id}`}
        className='products-page-link'
      >
          <Image 
            margin='0 auto'
            src={`/images/${props.product.image_link}.png`}           
          />
        {/* </AspectRatio> */}
      </NavLink>
    </Box>
    <Text mt='0.5rem' mb='0.5rem' fontWeight='bold' fontSize='xl'>{props.product.description}</Text>
    <Text marginBottom='0.5rem'>{props.product.name}</Text>
    {props.product.discount?
    <>
      <Text as='span'>In stock now for only: </Text>
      <Text as='span' textDecoration='line-through' color={discountRedColor}>{props.product.price.toFixed(2).replace('.', ',')}€</Text>
      <Text as='span' fontSize='2xl' color={discountGreenColor}>{(props.product.price*(1-(props.product.discount / 100))).toFixed(2).replace('.', ',')}€</Text>
      <Text as='span' fontSize='sm' color={discountYellowColor}>(-{props.product.discount}%)</Text>
    </>
    :
    <>
      <Text as='span' >In stock now for only: </Text>
      <Text as='span' fontSize='2xl'>{props.product.price.toFixed(2).replace('.', ',')}€</Text>
    </>
    }
    </Box>
  )
}
  
  export default CarouselItem;