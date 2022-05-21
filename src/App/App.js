import '../Style/App.css';
import * as React from 'react';
import Home from '../Components/Home'
import UserList from '../Components/UserList'
import ProductPage from '../Components/Products/ProductPage'
import ProductItem from '../Components/Products/ProductItem'
import CartPage from '../Components/Cart/CartPage'
import OrdersPage from '../Components/Orders/OrdersPage'
import { Routes, Route } from "react-router";
import NavBar from '../Components/NavBar';
import Profile from '../Components/Profile';
import OrderDetailed from '../Components/Orders/OrderDetailed';
import OrderPlaced from '../Components/Orders/OrderPlaced';
import ProtectedRoute from '../Components/ProtectedRoute';
import Loader from '../Components/Loader';
import { useEffect } from 'react';
import { api } from '../Features/routes';
import { Box } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from 'react-redux';

function App() {

  // React/Redux State/Action Management.
  const { isAuthenticated, isLoading, user } = useAuth0();
  const dataIsLoading = useSelector((state) => state.cartData.dataIsLoading)
  const addToCartToastDisplayedIsLoading = useSelector((state) => state.cartData.addToCartToastDisplayedIsLoading)
  // const totalPriceIsLoading = useSelector((state) => state.cartData.totalPriceIsLoading)
  const numberOfCartItemsIsLoading = useSelector((state) => state.cartData.numberOfCartItemsIsLoading)


  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const newUserObj = {
        "email": user.email,
        "admin": false,
        "image_link": user.picture
      }
      api.getUserByEmail(user.email).then((result) => {   
        if (result.data.length < 1) {
          api.addUser(newUserObj).then(() => {})
        }
      })
    }
  }, [isAuthenticated, isLoading, user.email, user.picture]);

  // || numberOfCartItemsIsLoading || totalPriceIsLoading || 
  // if (isLoading || dataIsLoading || addToCartToastDisplayedIsLoading || numberOfCartItemsIsLoading ) {
  //   return <Loader />;
  // }

  return (
    <Box className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={ <Home /> }/>
          <Route path="/users" element={ <ProtectedRoute component={UserList} /> }/>
          <Route path="/products" element={ <ProductPage /> }/>
          <Route path="/products/:id" element={ <ProductItem /> }/>
          <Route path="/cart" element={ <ProtectedRoute component={CartPage} /> }/>
          <Route path="/orders" element={ <ProtectedRoute component={OrdersPage} /> }/>
          <Route path="/profile" element={ <ProtectedRoute component={Profile} /> }/>
          <Route path="/orders/:id" element={ <ProtectedRoute component={OrderDetailed} /> }/>
          <Route path="/order-placed" element={ <ProtectedRoute component={OrderPlaced} /> }/>
          <Route 
            path="*" 
            element={
              <main style={{ padding: "1rem" }}>
                <p>404: There's nothing here!</p>
              </main>
            }
          />
        </Routes>
    </Box>
  );
}

export default App;

