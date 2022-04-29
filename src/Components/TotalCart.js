import '../Style/App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLazyGetTotalPriceQuery } from "../Features/apiSlice";
import { useSelector } from 'react-redux';



function TotalCart() {

  const [setTotalPrice, totalPrice] = useState(0);
  const authenticatedEmail = useSelector((state) => state.isAuthenticated.email)
  const [
    triggerGetTotalPrice,
  ] = useLazyGetTotalPriceQuery();

  useEffect(() => {
    triggerGetTotalPrice(authenticatedEmail).then((result) => {
      console.log(result.data[0])
      setTotalPrice(parseInt(result.data[0].sum))
    })
  });


  return(
    <div className='TotalCart'>
      <div className='product'>
        <h1>Total Price: {parseInt(totalPrice)}€</h1>
      </div>
    </div>
  )
}

export default TotalCart;