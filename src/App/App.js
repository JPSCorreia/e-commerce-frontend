import '../Style/App.css';
import * as React from 'react';
import Home from '../Components/Home'
import ProductPage from '../Components/Products/ProductPage'
import ProductItem from '../Components/Products/ProductItem'
import CartPage from '../Components/Cart/CartPage'
import OrdersPage from '../Components/Orders/OrdersPage'
import { Routes, Route } from "react-router";
import NavBar from '../Components/NavBar';
import Profile from '../Components/Profile';
import Footer from '../Components/Footer';
import OrderDetailed from '../Components/Orders/OrderDetailed';
import OrderPlaced from '../Components/Orders/OrderPlaced';
import SearchPage from '../Components/Search/SearchPage';
import SearchItem from '../Components/Search/SearchItem';
import ProtectedRoute from '../Components/ProtectedRoute';
import { useEffect } from 'react';
import { api } from '../Features/routes';
import { Box, Divider, useColorMode } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';


function App() {

  if (!process.env.REACT_APP_IN_DEVELOPMENT) {
    console.log = function() {}
  }

  // React/Redux State/Action Management.
  const { isAuthenticated, isLoading, user } = useAuth0();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode()


  useEffect(() => {
    const getData = async () => {
    if (!isLoading && isAuthenticated) {
      const registeredUser = await dispatch(api.users.getUserByEmail(user.email)).unwrap();
      if (registeredUser.length < 1) {
        await dispatch(api.users.addUser({"email": user.email, "admin": false, "image_link": user.picture}))
      }
    }}
    getData();
  }, [isAuthenticated, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Box className={(colorMode === 'light')? 'App-light' : 'App-dark' }>
        <NavBar />
        <Divider />
        <Box
          className='main'
          flexGrow='1'
          flexShrink='0'
        >
          <Routes>
            <Route exact path="/" element={ <Home /> }/>
            <Route path="/products/:page" element={ <ProductPage /> }/>
            <Route path="/products/:page/item/:id" element={ <ProductItem /> }/>
            <Route path="/search/:searchString/products/item/:id" element={ <SearchItem /> }/>
            <Route path="/search/:searchString" element={ <SearchPage /> }/>
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
        <Footer />
    </Box>
  );
}

export default App;

