import '../Style/App.css';
import * as React from 'react';
import { useState } from 'react';
import { useRemoveQuantityAddStockMutation, useDeleteFromCartMutation } from "../Features/apiSlice";
import { useSelector } from 'react-redux';

function CartItem(props) {

  const authenticatedEmail = useSelector((state) => state.isAuthenticated.email)
  const [quantity, setQuantity] = useState(props.product.quantity);
  const id = props.product.id;

  const [
    triggerRemoveQuantityAddStock
   ] = useRemoveQuantityAddStockMutation();

   const [
    triggerDeleteFromCart
   ] = useDeleteFromCartMutation();

  const removeFromCart = () => {
    const quant = 1
    if (quantity > 1) {
      triggerRemoveQuantityAddStock({quant, id, authenticatedEmail}).then(() => {
        setQuantity(quantity-quant)
      })
    }
    if (quantity === 1) {
      triggerRemoveQuantityAddStock({quant, id, authenticatedEmail}).then(() => {
      })
      triggerDeleteFromCart(id).then(() => {
        setQuantity(0)
          document.getElementById(`cart-item-${props.product.id}`).classList.add('hide-display')
      })
    }

  }

  const removeAllFromCart = () => {
    const quant = quantity
    if (quantity > 0) {
      triggerRemoveQuantityAddStock({quant, id, authenticatedEmail}).then(() => {
        triggerDeleteFromCart(id).then(() => {
          setQuantity(0)
            
            document.getElementById(`cart-item-${props.product.id}`).classList.add('hide-display')
        })
      })
    }

  }

  return(
    <li 
      id={`cart-item-${props.product.id}`}
      className='product'
    >
      <div className='product-description'>
        <div className='product-name'>
          {props.index}
          {props.product.name} - {props.product.description} 
        </div>
        <div className='product-price'>Total Price: {(parseInt(props.product.price) * quantity) + '€'}</div>
        <div className='product-quantity'>Quantity: {quantity}</div>
        <button onClick={() => removeFromCart()}>
           Remove from Cart
        </button>
        <button onClick={() => removeAllFromCart()}>
           Remove All from Cart
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

export default CartItem;