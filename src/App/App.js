import '../Style/App.css';
import * as React from 'react';
import Home from '../Components/Home'
import UserList from '../Components/UserList'
import ProductList from '../Components/ProductList'
import CartList from '../Components/CartList'
import OrderList from '../Components/OrderList'
import Dashboard from '../Components/Dashboard'
import { Routes, Route } from "react-router";
import { Navigate } from "react-router";
import NavBar from '../Components/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setEmail, setLogState, setUsername } from '../Features/isAuthenticatedSlice';
import axios from 'axios';

function App() {

  // Redux State/Action Management.
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value)
  
  const dispatch = useDispatch();
  

  useEffect(() => {
    axios.get('/auth/current-session').then(({data}) => { 
      if (data) {
        const newUserObj = {
          "email": data.email,
          "admin": false
        }
        dispatch(setEmail(data.email))
        dispatch(setUsername(data.nickname))
        if (!isAuthenticated) {
          axios.get(`http://localhost:8080/api/users/${data.email}`).then((result) => {   
            if (result.data.length < 1) {
              axios.post(`http://localhost:8080/api/users/`, newUserObj ).then(({newUser}) => {
                console.log(`created new user:`)
                console.log(newUserObj)
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
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={ isAuthenticated?  <Dashboard /> : <Home /> }>
        </Route>
        <Route path="/dashboard" element={ isAuthenticated? <Dashboard /> : <Navigate to="/" /> }>
        </Route>
        <Route path="/users" element={ isAuthenticated? <UserList /> : <Navigate to="/" /> }>
        </Route>
        <Route path="/products" element={ isAuthenticated? <ProductList /> : <Navigate to="/" /> }>
        </Route>
        <Route path="/cart" element={ isAuthenticated? <CartList /> : <Navigate to="/" /> }>
        </Route>
        <Route path="/orders" element={ isAuthenticated? <OrderList /> : <Navigate to="/" /> }>
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
    </div>
  );
}

export default App;

