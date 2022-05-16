import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_IN_DEVELOPMENT? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_PUBLIC_BACKEND_URL 


// endpoints
export const api = {

  // auth/users
  // get data from current session.
  verifySession: () => { return axios.get(`/auth/current-session`) },
  // get user by email.
  getUserByEmail: (email) => { return axios.get(`${backendURL}/api/users/${email}`) },
  // create new user.
  addUser: (newUserObj) => { return axios.post(`${backendURL}/api/users/`, newUserObj) },
  // get list of all users.
  getUsers: () => { return axios.get(`${backendURL}/api/users`) },
  // get register date.
  getMonthAndYear: (email) => { return axios.get(`${backendURL}/api/users/get_date/${email}`) },



  // protectedRoute: (route, arg, token) => {
  //   let data = { message: '' }
  //   try { 
  //     const response = axios.get(`${backendURL}/api/users/get_date/${arg}`, { headers: {Authorization: `Bearer ${token}` }}).then(() => {
  //       if (!response.ok) throw response
  //       data = response
  //     })
  //   } catch (error) {
  //     throw error
  //   } finally {
  //     return data
  //   }
  // },

  protectedGetMonthAndYear: async (email, token) => {
    return axios.get(`${backendURL}/api/users/get_date/${email}`, { headers: {Authorization: `Bearer ${token}` }})
  },




  // export async function getProtectedMessage(token) {
  //   let data = { message: '' }
  //   try {
  //     const response = await fetch(`${SERVER_URI}/messages/protected`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     if (!response.ok) throw response
  //     data = await response.json()
  //   } catch (e) {
  //     throw e
  //   } finally {
  //     return data.message
  //   }
  //  }








  // testing auth endpoints
  loginAuth0: () => { return axios.get(`/auth/login`) },
  



  getCartProductsByEmail: createAsyncThunk(
    'productData/getCartProductsByEmail',
    async (authenticatedEmail) => {
      const response = await axios.get(`${backendURL}/api/cart_items/cart_products/${authenticatedEmail}`)
      return response
    }
  ),





  // products
  // get list of all products.
  getProducts: () => { return axios.get(`${backendURL}/api/products`) },
  // get one product by id.
  getProduct: (id) => { return axios.get(`${backendURL}/api/products/${id}`) },
  // add new product.
  addProduct: (newProductObj) => { return axios.post(`${backendURL}/api/product`, newProductObj) },
  // remove from quantity and add stock to that item.
  removeStock: ({quant, id}) => { return axios.put(`${backendURL}/api/products`, {quantity: quant, products_id: id}) },

  // cart_items
  // remove from stock and add quantity to that item.
  addProductToCart: ({quant, id, authenticatedEmail}) => { return axios.post(`${backendURL}/api/cart_items`, {products_id: id, user_email: authenticatedEmail, quantity: quant}) },
  // get cart item by email and id.
  getCartByEmail: ({authenticatedEmail, id}) => { return axios.get(`${backendURL}/api/cart_items/get_cart/${authenticatedEmail}/${id}`) },
  // get cart products by email.
  getCartProductsByEmail2: (authenticatedEmail) => { return axios.get(`${backendURL}/api/cart_items/cart_products/${authenticatedEmail}`) },
  // remove from stock and add quantity to that item.
  removeStockAddQuantity: ({quant, id, authenticatedEmail}) => { return axios.put(`${backendURL}/api/cart_items`, {quantity: quant, products_id: id, user_email: authenticatedEmail}) },
  // remove from quantity and add stock to that item.
  removeQuantityAddStock: ({quant, id, authenticatedEmail}) => { return axios.put(`${backendURL}/api/cart_items/remove_quantity`, {quantity: quant, products_id: id, user_email: authenticatedEmail}) },
  // get the price sum of all items in user's cart.
  getTotalPrice: (email) => { return axios.get(`${backendURL}/api/cart_items/total_price/${email}`) },
  // delete row from cart.
  deleteFromCart: (id) => { return axios.delete(`${backendURL}/api/cart_items/${id}`) },
  // get item number total from cart.
  getItemTotal: (email) => { return axios.get(`${backendURL}/api/cart_items/total_number/${email}`) },
  // delete row from cart.
  deleteAllFromCart: (email) => { return axios.delete(`${backendURL}/api/cart_items/delete_cart/${email}`) },

  // orders
  // add new order
  addOrder: ({authenticatedEmail, totalPrice}) => { return axios.post(`${backendURL}/api/orders`, {user_email: authenticatedEmail, total: totalPrice, status: 'Ordered'} )},
  // get number of orders.
  getNumberOfOrders: (email) => { return axios.get(`${backendURL}/api/orders/get_number/${email}`) },
  // get list of all orders.
  getAllOrders: (email) => { return axios.get(`${backendURL}/api/orders/get_all/${email}`) },
  // get list of all order items by id.
  getOrderById: (id) => { return axios.get(`${backendURL}/api/orders/${id}`) },
  // get list of all order items by id.
  getAllOrderItems: (id) => { return axios.get(`${backendURL}/api/orders/order_products/${id}`) },

  // order_items
  // add cart_items to order_items
  addOrderItems: (orderItems) => { return axios.post(`${backendURL}/api/order_items`, orderItems )},

}


