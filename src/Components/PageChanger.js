import '../Style/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../Features/routes';
import { Flex } from '@chakra-ui/react'
import PagButton from './PagButton';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";


function PageChanger(){

  const dispatch = useDispatch();
  const numberOfProducts = useSelector((state) => state.productData.numberOfProducts)
  const { page } = useParams();

  useEffect(() => {
    const getData = async () => {
      await dispatch(api.products.getNumberOfProducts())
    }
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pages = [];

  const setPageButtons = () => {

    if (Number(page) === 1) {
      pages.push(
        <PagButton disabled key='previous'>
          Previous
        </PagButton>
      )
    } else {
      pages.push(
        <NavLink
          to={`/products/${Number(page)-1}`}
          key={`previous-${Number(page)}`}
          className='products-page-link'
        >
          <PagButton key='previous'>
            Previous
          </PagButton>
        </NavLink>
      )
    }
    for (let i = 1; i <= Math.ceil(Number(numberOfProducts)/9); i++) {
      
      if (Number(page) === i) {
        pages.push(
          <NavLink
            to={`/products/${i}`}
            key={i}
            className='products-page-link'
          >
            <PagButton active key={i} >
              {i}
            </PagButton>
          </NavLink>
        )
      } else {
        pages.push(
          <NavLink
            to={`/products/${i}`}
            key={i}
            className='products-page-link'
          >
            <PagButton key={i} >
              {i}
            </PagButton>
          </NavLink>
        )
      }

    }
    if (Number(page) === Math.ceil(Number(numberOfProducts)/9)) {
      pages.push(
        <PagButton disabled key='previous'>
          Next
        </PagButton>
      )
    } else {
      pages.push(
        <NavLink
          to={`/products/${Number(page)+1}`}
          key={`next-${Number(page)}`}
          className='products-page-link'
        >
          <PagButton key='previous'>
            Next
          </PagButton>
        </NavLink>
      )
    }

  }


  setPageButtons();

  return (
    <Flex
      p={5}
      mt={5}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        {pages}
      </Flex>
    </Flex>
  );
};

export default PageChanger;