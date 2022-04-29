import '../Style/App.css';
import * as React from 'react';
import { useRemoveStockMutation, useAddProductToCartMutation, useLazyGetCartByEmailQuery, useRemoveStockAddQuantityMutation } from "../Features/apiSlice";
import { useSelector } from 'react-redux';
import { useState } from 'react';

function Product(props) {

  const authenticatedEmail = useSelector((state) => state.isAuthenticated.email)
  const id = props.product.id
  const [stock, setStock] = useState(props.product.stock);
  const [
    triggerGetCart
   ] = useLazyGetCartByEmailQuery();

   const [
    triggerAddProductToCart
   ] = useAddProductToCartMutation();

   const [
    triggerRemoveStockAddQuantity
   ] = useRemoveStockAddQuantityMutation();

   const [
    triggerRemoveStock
   ] = useRemoveStockMutation();

  const addToCart = () => {
    //Look if time exists in cart already
    if (stock > 0) {
       triggerGetCart({authenticatedEmail, id}).then((result) => {
        const quant = 1;
        if (result.data.length < 1) {
          //Create new row if product doesn't already exist in cart
          triggerAddProductToCart({authenticatedEmail, id, quant}).then(() => {
            setStock(stock-quant)
            triggerRemoveStock({quant, id}).then(() => {
              setStock(stock-quant)
            })
          })
        } else {
          //Add to existing row if product already exists in cart
          triggerRemoveStockAddQuantity({quant, id, authenticatedEmail}).then(() => {
            setStock(stock-quant)
          })
        }
      })
    }
  }

  return(
    <li 
      id={props.id}
      className='product'
    >
      <div className='product-description'>
        <div className='product-name'>
          {props.index}
          {props.product.name} - {props.product.description} 
        </div>
        <div className='product-stock'>Stock: {stock}</div>
        <div className='product-price'>Price: {props.product.price}</div>
        <button onClick={() => addToCart()}>
            Add to Cart
        </button>
      </div>
      <img
        className='product-image-preview'
        alt={`${props.product.image_link}`}
        src={`images/${props.product.image_link}.jpg`}
      />
    </li>
  )
}

export default Product;