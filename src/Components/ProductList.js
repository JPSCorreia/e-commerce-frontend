import '../Style/App.css';
import * as React from 'react';
import { useGetProductsQuery } from "../Features/apiSlice";

function ProductList() {

  const {
    data: products,
    isLoading,
    isError,
    error,
    isSuccess
  } = useGetProductsQuery();

  return(
    <div className='ProductList'>
      <h1>Products</h1>
      <ul>
      {isLoading && <h2>...Loading</h2>}
      {isError && <h2>Something went wrong {error.status}</h2>}
      {isSuccess &&
        products?.map((product, index) => (
          <li key={index} >{product.name} - {product.description}</li>
        ))
      }
      </ul>
    </div>
  )
}

export default ProductList;