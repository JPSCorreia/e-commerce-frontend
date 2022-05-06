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
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setEmail, setLogState, setUsername } from '../Features/isAuthenticatedSlice';
import { api } from '../Features/routes';
import { Box } from '@chakra-ui/react'


function App() {

  // React/Redux State/Action Management.
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value)
  const dispatch = useDispatch();

  useEffect(() => {
    api.verifySession().then(({data}) => { 
      if (data) {
        const newUserObj = {
          "email": data.email,
          "admin": false
        }
        dispatch(setEmail(data.email))
        dispatch(setUsername(data.nickname))
        if (!isAuthenticated) {
          api.getUserByEmail(data.email).then((result) => {   
            if (result.data.length < 1) {
              api.addUser(newUserObj).then(() => {
              })
            }
          })
        }
        dispatch(setLogState(true));
        return;
      } 
      dispatch(setLogState(false));
      dispatch(setUsername('unregistered visitor'))
    })
  })


  return (
    <Box className="App">
        <NavBar />
        <Routes>
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
        </Routes>
    </Box>
  );
}

export default App;

