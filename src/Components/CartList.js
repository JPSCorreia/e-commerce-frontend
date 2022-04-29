import '../Style/App.css';
import * as React from 'react';
import CartItem from './CartItem.js';
import TotalCart from './TotalCart.js';
import { useLazyGetCartProductsByEmailQuery } from "../Features/apiSlice";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setQuantity } from '../Features/productQuantitySlice';

function CartList() {

  // const dispatch = useDispatch();
  const [listLoaded, setListLoaded] = useState(false);
  const email = useSelector((state) => state.isAuthenticated.email) 
  // const quantityArray = useSelector((state) => state.productQuantity)
  

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
  

  // const auxArray = [];
  // const getProductQuant = () => {
  //   cartProducts.data?.forEach((product, index) => {
  //     auxArray.push(product.quantity)
  //   })
  //   dispatch(setQuantity(auxArray))
  // }
  // getProductQuant();

  // useEffect(() => {
  //   if (cartProducts.status === 'fulfilled') {
  //     console.log(cartProducts)
  //     cartProducts.data.forEach((product, pIndex) => {
        
  //       dispatch(setQuantity({index: product.id, data: product.quantity}))
  //       console.log(quantityArray)
  //     })
  //   }
  // },[dispatch, cartProducts])


  const cartProductsList = cartProducts.data?.map((product, index) => (
    <CartItem 
      product={product}
      key={index}
      id={`cart-product-${index+1}`}
    />
  ))


  // const cartProductsList = cartProducts.data?.map((product, index) => {
  //   return (quantityArray[product.id] > 0)?
  //     <CartItem 
  //       product={product}
  //       productQuant={quantityArray[index]}
  //       key={index}
  //       id={`cart-product-${index+1}`}
  //     />
  //   :
  //     ''
  // })

  // mandar object com index e data, { index: products_id, data: quantity}


  return(
    <div className='cartlist'>
      <h1>Cart</h1>
      <ul>
      {cartProducts.isUninitialized && <h2>...Loading</h2>}
      {cartProducts.isError && <h2>Something went wrong {cartProducts.status}</h2>}
      {listLoaded && cartProductsList}
      </ul>
      <TotalCart />
    </div>
  )
}

export default CartList;