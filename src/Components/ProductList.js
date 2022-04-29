import '../Style/App.css';
import * as React from 'react';
import Product from './Product';
import { useLazyGetProductsQuery } from "../Features/apiSlice";
import { useEffect, useState } from 'react';

function ProductList() {

  const [listLoaded, setListLoaded] = useState(false);

  const [
    triggerGetProducts,
    products,
  ] = useLazyGetProductsQuery();

  useEffect(() => {
    const loadData = () => {
      triggerGetProducts().then(() => {
        setListLoaded(true)
      })
    }
    loadData();
  }, [triggerGetProducts]);

  const productsList = products.data?.map((product, index) => (
    <Product 
      product={product}
      key={index}
      id={`product-${index+1}`}
    />
  ))

  return(
    <div className='ProductList'>
      <h1>Products</h1>
      <ul>
      {products.isUninitialized && <h2>...Loading</h2>}
      {products.isError && <h2>Something went wrong {products.status}</h2>}
      {listLoaded && productsList}
      </ul>
    </div>
  )
}

export default ProductList;