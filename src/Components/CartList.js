import '../Style/App.css';
import * as React from 'react';
import CartItem from './CartItem.js';
import TotalCart from './TotalCart.js';
import { useLazyGetCartProductsByEmailQuery } from "../Features/apiSlice";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CartList() {

  // const dispatch = useDispatch();
  const [listLoaded, setListLoaded] = useState(false);
  const email = useSelector((state) => state.isAuthenticated.email) 
  const [cartSize, setCartSize] = useState(0);

  

  const [
    triggerGetCartProducts,
    cartProducts,
  ] = useLazyGetCartProductsByEmailQuery();

  useEffect(() => {
    const loadData = () => {
      triggerGetCartProducts(email).then(() => {
        setListLoaded(true)
      })
    }
    loadData();
  }, [triggerGetCartProducts, email]);


  // useEffect(() => {
  //   setCalculation(() => count * 2);
  // }, [count]); // <- add the count variable here
  



  const cartProductsList = cartProducts.data?.map((product, index) => (
    <CartItem 
      product={product}
      key={index}
      id={`cart-product-${index+1}`}
    />
  ))
  // console.log(cartProductsList)
  // if (cartProductsList) setCartSize(cartProductsList.length)


  return(
    <div className='cartlist'>
      <h1>Cart</h1>
      <ul>
      {cartProducts.isUninitialized && <h2>...Loading</h2>}
      {cartProducts.isError && <h2>Something went wrong {cartProducts.status}</h2>}
      {/* {cartProducts.data && cartProducts.data.length === 0 && (<h1>Cart is empty.</h1>)} */}
      { cartSize && (<h1>Cart is empty.</h1>)}
      {listLoaded && cartProductsList}
      </ul>
      <TotalCart />
    </div>
  )
}

export default CartList;