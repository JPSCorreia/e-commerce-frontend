import '../Style/App.css';
import * as React from 'react';
import Home from '../Components/Home'
import UserList from '../Components/UserList'
import ProductPage from '../Components/ProductPage'
import CartPage from '../Components/CartPage'
import OrdersPage from '../Components/OrdersPage'
import Dashboard from '../Components/Dashboard'
import { Routes, Route } from "react-router";
import { Navigate } from "react-router";
import NavBar from '../Components/NavBar';
import { useEffect } from 'react';
import { api } from '../Features/routes';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";


function App() {

  // React/Redux State/Action Management.
  const { isAuthenticated, isLoading, user } = useAuth0();
  const spinnerColor = useColorModeValue('blue.500', 'blue.200');
  const emptySpinnerColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const newUserObj = {
        "email": user.email,
        "admin": false
      }
      api.getUserByEmail(user.email).then((result) => {   
        if (result.data.length < 1) {
          api.addUser(newUserObj).then(() => {})
        }
      })
    }
  });

  return (
    <Box className="App">
        <NavBar />
        <Routes>
          { !isLoading? (
            <>
          <Route exact path="/" element={ isAuthenticated?  <Dashboard /> : <Home /> }>
          </Route>
          <Route path="/dashboard" element={ isAuthenticated? <Dashboard /> : <Navigate to="/" /> }>
          </Route>
          <Route path="/users" element={ isAuthenticated? <UserList /> : <Navigate to="/" /> }>
          </Route>
          <Route path="/products" element={ isAuthenticated? <ProductPage /> : <Navigate to="/" /> }>
          </Route>
          <Route path="/cart" element={ isAuthenticated? <CartPage /> : <Navigate to="/" /> }>
          </Route>
          <Route path="/orders" element={ isAuthenticated? <OrdersPage /> : <Navigate to="/" /> }>
          </Route>
          <Route 
            path="*" 
            element={
              <main style={{ padding: "1rem" }}>
                <p>404: There's nothing here!</p>
              </main>
            }
          >
          </Route>
          </>) : 
          <Route 
            path="*" 
            element={(
              <div className='loading-spinner'>
                <Spinner 
                  size='xl'
                  thickness='4px'
                  speed='0.65s'
                  label='loading'
                  emptyColor={emptySpinnerColor}
                  color={spinnerColor}
                />
              </div>
            )}
          >
          </Route>
          }
        </Routes>
    </Box>
  );
}

export default App;

