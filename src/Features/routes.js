import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_IN_DEVELOPMENT? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_PUBLIC_BACKEND_URL 

// endpoints
export const api = {

  // user routes
  users: {

        // test CORS.
        testCors: createAsyncThunk(
          'userData/testCors',
          async () => { 
            return axios.get(`${backendURL}/test-cors`) 
          }
        ),

    // get list of all users.
    getUsers: createAsyncThunk(
      'userData/getUsers',
      async () => { 
        return axios.get(`${backendURL}/api/users`) 
      }
    ),

    // get register date.
    getMonthAndYear: createAsyncThunk(
      'userData/getMonthAndYear',
      async (obj) => {
        return axios.get(`${backendURL}/api/users/get_date/${obj.user_email}`, { headers: {Authorization: `Bearer ${obj.token}` }})
      }
    ),

    // get user by email.
    getUserByEmail: createAsyncThunk(
      'userData/getUserByEmail',
      async (email) => { 
        const response = await axios.get(`${backendURL}/api/users/${email}`) 
        return response.data
      }
    ),

    // create new user.
    addUser: createAsyncThunk(
      'userData/addUser',
      async (obj) => {
        const response = await axios.post(`${backendURL}/api/users`, obj)
        return response.data
      }
    ),
    
  },




  // product routes
  products: {
  
    // get list of all products.
    getProducts: createAsyncThunk(
      'productData/getProducts',
      async () => { 
        return axios.get(`${backendURL}/api/products`) 
      }
    ),

    // get list of all products.
    getProductPage: createAsyncThunk(
      'productData/getProductPage',
      async (page) => { 
        return axios.get(`${backendURL}/api/products/page/${page}`) 
      }
    ),

    // get list of all products.
    getNumberOfProducts: createAsyncThunk(
      'productData/getNumberOfProducts',
      async () => { 
        const response = axios.get(`${backendURL}/api/products/total/get_number`) 
        return response
      }
    ),

    // get list of all products.
    getMostDiscountedProducts: createAsyncThunk(
      'productData/getMostDiscountedProducts',
      async (number) => { 
        const response = await axios.get(`${backendURL}/api/products/discounted/${number}`) 
        return response.data
      }
    ),

    // set product stock
    setStock: createAsyncThunk(
      'productData/setStock',
      async (obj) => {
        return { id: obj.id, data: obj.stock}
      }
    ),

    // remove from product stock.
    removeStock: createAsyncThunk(
      'productData/removeStock',
      async (obj) => {
        await axios.put(`${backendURL}/api/products`,  { quantity: obj.quantity, products_id: obj.id })
        return { quantity: obj.quantity, id: obj.id }
      }
    ),

    // add to product stock.
    addStock: createAsyncThunk(
      'productData/addStock',
      async (obj) => {
        await axios.put(`${backendURL}/api/products/add_stock`,  { quantity: obj.quantity, products_id: obj.id })
        return { quantity: obj.quantity, id: obj.id }
      }
    ),


    // add order items
    getSearchResults: createAsyncThunk(
      'productData/getSearchResults',
      async (searchString) => {
        const response = await axios.post(`${backendURL}/api/products/search_products/search`, {search: searchString})
        return response
      }
    ),


    // get list of all products.
    getProductById: createAsyncThunk(
      'productData/getProductById',
      async (id) => { 
        const response = await axios.get(`${backendURL}/api/products/${id}`)
        return response
      }
    ),

    // set product rating
    setRating: createAsyncThunk(
      'productData/setRating',
      async (rating) => {
        return { rating: rating }
      }
    ),
    

    

  },




  // cart routes
  cart: {

    // get cart products by email.
    getCartProductsByEmail: createAsyncThunk(
      'cartData/getCartProductsByEmail',
      async (obj) => {
        const response = await axios.get(`${backendURL}/api/cart_items/cart_products/${obj.email}`, { headers: {Authorization: `Bearer ${obj.token}` }})
        return response.data
      }
    ),

    // get item number total from cart.
    getNumberOfCartItems: createAsyncThunk(
      'cartData/getNumberOfCartItems',
      async (obj) => { 
        const response = await axios.get(`${backendURL}/api/cart_items/total_number/${obj.email}`, { headers: {Authorization: `Bearer ${obj.token}` }}) 
        return response.data[0].sum
      }
    ),

    // change the number of total items in cart
    setNumberOfCartItems: createAsyncThunk(
      'cartData/setNumberOfCartItems',
      async (number) => { 
        return number
      }
    ),

    // change the number of total items in cart
    addToNumberOfCartItems: createAsyncThunk(
      'cartData/addToNumberOfCartItems',
      async (number) => { 
        return number
      }
    ),

    // remove from cart item quantity by product id.
    removeQuantity: createAsyncThunk(
      'cartData/removeQuantity',
      async (obj) => {
        await axios.put(`${backendURL}/api/cart_items/remove_quantity`,  { quantity: obj.quantity, products_id: obj.products_id, user_email: obj.user_email })
        return obj.quantity
      }
    ),

    // add to cart item quantity by product id.
    addQuantity: createAsyncThunk(
      'cartData/addQuantity',
      async (obj) => {
        await axios.put(`${backendURL}/api/cart_items`,  { quantity: obj.quantity, products_id: obj.products_id, user_email: obj.user_email })
        return obj.quantity
      }
    ),

    // get cart item by email and id.
    getCartByEmail: createAsyncThunk(
      'cartData/getCartProductsByEmail',
      async (obj) => {
        const response = await axios.get(`${backendURL}/api/cart_items/get_cart/${obj.email}/${obj.id}`, { headers: {Authorization: `Bearer ${obj.token}` }})
        return response
      }
    ),

    // set price total in cart
    setTotalPrice: createAsyncThunk(
      'cartData/setTotalPrice',
      async (price) => { 
        return price
      }
    ),

    // get price total from cart
    getTotalPrice: createAsyncThunk(
      'cartData/getTotalPrice',
      async (obj) => { 
        const response = await axios.get(`${backendURL}/api/cart_items/total_price/${obj.user_email}`)
        return response.data[0].sum
      }
    ),


    // add product to cart
    addProductToCart: createAsyncThunk(
      'cartData/addProductToCart',
      async (obj) => {
        const response = await axios.post(`${backendURL}/api/cart_items`, {products_id: obj.products_id, user_email: obj.user_email, quantity: obj.quantity})
        return { id: response.data, products_id: obj.products_id, user_email: obj.user_email, quantity: obj.quantity }
      }
    ),

    // set add to cart toast display
    setAddToCartToastDisplayed: createAsyncThunk(
      'cartData/setAddToCartToastDisplayed',
      async (state) => { 
        return state
      }
    ),

    // delete from cart by user and product id
    deleteFromCart: createAsyncThunk(
      'cartData/deleteFromCart',
      async (obj) => {
        const response = await axios.delete(`${backendURL}/api/cart_items/delete_item/${obj.user_email}/${obj.products_id}`)
        return { ...response.data[0], index: obj.index }
      }
    ),

    // delete all items from cart
    deleteAllFromCart: createAsyncThunk(
      'cartData/deleteAllFromCart',
      async (email) => {
        await axios.delete(`${backendURL}/api/cart_items/delete_cart/${email}`) 
      }
    ),
    
  },



  // order routes
  orders: {

    // get list of all orders.
    getAllOrders: createAsyncThunk(
      'orderData/getAllOrders',
      async (orderObj) => { 
        const response = await axios.get(`${backendURL}/api/orders/get_all/${orderObj.email}`, { headers: {Authorization: `Bearer ${orderObj.token}` }}) 
        return response.data
      }
    ),

    // get list of all order items by order id.
    getAllOrderItems: createAsyncThunk(
      'orderData/getAllOrderItems',
      async (orderObj) => { 
        const response = await axios.get(`${backendURL}/api/orders/order_products/${orderObj.id}`, { headers: {Authorization: `Bearer ${orderObj.token}` }}) 
        return response.data
      }
    ),

    // add new order
    addOrder: createAsyncThunk(
      'orderData/addOrder',
      async (obj) => {
        const response = await axios.post(`${backendURL}/api/orders`, { 
          user_email: obj.user_email, 
          total: obj.total_price, 
          status: 'Ordered',
          full_name: obj.full_name,
          street_address: obj.street_address,
          city: obj.city,
          postcode: obj.postcode,
          phone_number: obj.phone_number,
          country: obj.country
        }) // fix headers and data
        return response.data
      }
    ),

    // add order items
    addOrderItems: createAsyncThunk(
      'orderData/addOrderItems',
      async (orderItems) => {
        await axios.post(`${backendURL}/api/order_items`, orderItems)
      }
    ),

    // set order placed toast display
    setAddOrderToastDisplayed: createAsyncThunk(
      'orderData/setAddOrderToastDisplayed',
      async (state) => { 
        return state
      }
    ),

    // get number of orders.
    getNumberOfOrders: createAsyncThunk(
    'orderData/getNumberOfOrders',
    async (obj) => { 
      const response = await axios.get(`${backendURL}/api/orders/get_number/${obj.user_email}`, { headers: {Authorization: `Bearer ${obj.token}` }}) 
      return response.data
    }
  ),

  },

  // review routes
  reviews: {

    getReviews: createAsyncThunk(
      'reviewsData/getReviews',
      async (obj) => {
        const response = await axios.get(`${backendURL}/api/reviews/${obj.products_id}`, 
          { headers: {Authorization: `Bearer ${obj.token}` }}
        )
        
       const responseData = { data: response.data, products_id: obj.products_id }
       return responseData
      }
    ),

    addReview: createAsyncThunk(
      'reviewsData/addReview',
      async (obj) => {
        const response = await axios.post(`${backendURL}/api/reviews`, 
          { headers: {Authorization: `Bearer ${obj.token}` }, 
          data: { 
            products_id: obj.products_id,
            user_email: obj.user_email,
            full_name: obj.full_name,
            comment: obj.comment,
            rating: obj.rating,
            image_link: obj.image_link
          }
          }
        )
        return { id: response.data, products_id: obj.products_id, user_email: obj.user_email, full_name: obj.full_name, comment: obj.comment, rating: obj.rating, image_link: obj.image_link}
      }
    ),

    getReview: createAsyncThunk(
      'reviewsData/getReview',
      async (obj) => {
        const response = await axios.get(`${backendURL}/api/reviews/get_review/${obj.user_email}/${obj.products_id}`, 
          { headers: {Authorization: `Bearer ${obj.token}` }  }
        )
        return response.data
      }
    ),

    editReview: createAsyncThunk(
      'reviewsData/editReview',
      async (obj) => {
        await axios.put(`${backendURL}/api/reviews/${obj.id}`, 
          { headers: {Authorization: `Bearer ${obj.token}` }, 
          data: { 
            full_name: obj.full_name,
            comment: obj.comment,
            rating: obj.rating,
            image_link: obj.image_link
          }
          }
        )
        const response = { id: obj.id, products_id: obj.products_id, user_email: obj.user_email, full_name: obj.full_name, comment: obj.comment, rating: obj.rating, image_link: obj.image_link}
        return response
      }
    ),

  },

  
  // orderReviews routes
  orderReviews: {

    getReviews: createAsyncThunk(
      'orderReviewsData/getReviews',
      async (obj) => {
        const response = await axios.get(`${backendURL}/api/orderReviews/${obj.user_email}/${obj.order_id}`, 
          { headers: {Authorization: `Bearer ${obj.token}` }}
        )
        const responseData = { data: response.data, order_id: obj.order_id }
        return responseData
        // console.log(response)
        // if (response.status === 200) {
        //   // const responseData = { data: response.data, order_id: obj.order_id }
        //   const responseData = { data: [], order_id: obj.order_id }
        //   return responseData
        // } else {
        //   const responseData = { data: [], order_id: obj.order_id }
        //   return responseData
        // }

        // const responseData = { data: response.data, order_id: obj.order_id }
        // if (response.data) {
        //   return responseData
        // } else {
        //   return []
        // }
        
      }
    ),

  },



  // addresses routes
  addresses: {

    addAddress: createAsyncThunk(
      'addressesData/addAddress',
      async (obj) => {
        await axios.post(`${backendURL}/api/addresses`, 
          { headers: {Authorization: `Bearer ${obj.token}` }, 
          data: { 
            user_email: obj.user_email,
            full_name: obj.full_name,
            phone_number: obj.phone_number,
            country: obj.country,
            postcode: obj.postcode,
            street_address: obj.street_address,
            city: obj.city
          }
          }
        )
      }
    ),

    getAddresses: createAsyncThunk(
      'addressesData/getAddresses',
      async (obj) => {
        const response = await axios.get(`${backendURL}/api/addresses/${obj.user_email}`, 
          { headers: {Authorization: `Bearer ${obj.token}` }}
        )
        return response.data
      }
    ),

    deleteAddress: createAsyncThunk(
      'addressesData/deleteAddress',
      async (obj) => {
        const response = await axios.delete(`${backendURL}/api/addresses/${obj.id}`, 
          { headers: {Authorization: `Bearer ${obj.token}` }}
        )
        return response.data
      }
    ),

    editAddress: createAsyncThunk(
      'addressesData/editAddress',
      async (obj) => {
        await axios.put(`${backendURL}/api/addresses/${obj.id}`, 
          { headers: {Authorization: `Bearer ${obj.token}` }, 
          data: { 
            full_name: obj.full_name,
            phone_number: obj.phone_number,
            country: obj.country,
            postcode: obj.postcode,
            street_address: obj.street_address,
            city: obj.city
          }
          }
        )
      }
    ),
  }

}
