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
          <li 
          key={index}
          className='product'
          >
            <div className='product-description'>
              <div className='product-name'>
                {product.name} - {product.description} 
              </div>
              <div className='product-stock'>Stock: {product.stock}</div>
              <div className='product-price'>Price: {product.price}</div>
            </div>
            
            <img
              className='product-image-preview'
              alt={`${product.image_link}`}
              src={`images/${product.image_link}.jpg`}
            />
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default ProductList;