import '../Style/App.css';
import { chakra, useColorModeValue } from '@chakra-ui/react'


function PagButton (props) {

  const activeStyle = {
    bg: useColorModeValue("blue.500", "blue.200"),
    color: useColorModeValue("white", "gray.700"),
  };

  return (
    <chakra.button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg={useColorModeValue("gray.200", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
      opacity={props.disabled && 0.6}
      _hover={!props.disabled && activeStyle}
      cursor={props.disabled && "not-allowed"}
      {...(props.active && activeStyle)}
    >
      {props.children}
    </chakra.button>
  );
};

export default PagButton;