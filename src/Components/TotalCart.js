import '../Style/App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLazyGetTotalPriceQuery } from "../Features/apiSlice";
import { useSelector } from 'react-redux';
import axios from 'axios';



function TotalCart() {

  const [totalPrice, setTotalPrice] = useState(0);
  const authenticatedEmail = useSelector((state) => state.isAuthenticated.email)
  const [
    triggerGetTotalPrice,
  ] = useLazyGetTotalPriceQuery();

  useEffect(() => {
    // triggerGetTotalPrice(authenticatedEmail).then((result) => {
    //   console.log(result)
    //   setTotalPrice(parseInt(result.data[0].sum))
    // })
    axios.get(`http://localhost:8080/api/cart_items/total_price/${authenticatedEmail}`).then((result) => {  
      setTotalPrice(parseInt(result.data[0].sum))
    })
  }, [triggerGetTotalPrice, authenticatedEmail]);
  console.log(totalPrice)

  return(
    <div className='TotalCart'>
      <div className='product'>
        <h1>Total Price: {totalPrice}€</h1>
      </div>
    </div>
  )
}

export default TotalCart;