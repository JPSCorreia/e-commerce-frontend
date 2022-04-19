import '../Style/App.css';
import * as React from 'react';
import Home from '../Components/Home'
import UserList from '../Components/UserList'
import ProductList from '../Components/ProductList'
import CartList from '../Components/CartList'
import Dashboard from '../Components/Dashboard'
import { Routes, Route } from "react-router";
import { Navigate } from "react-router";
import NavBar from '../Components/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLogState } from '../Features/isAuthenticatedSlice';
import axios from 'axios';
// import { useVerifySessionQuery } from '../Features/apiSlice';

function App() {

  // Redux State/Action Management.
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value)
  const dispatch = useDispatch();

  // const { response } = useVerifySessionQuery();



  // useEffect(() => {
  //   const handleVerification = async (data) => {
  //     console.log(data)
  //     if (data) {
  //       dispatch(setLogState(true));
  //       return;
  //     }
  //     dispatch(setLogState(false));
  //   }
  //   handleVerification(response);
  // }, [response, dispatch])

    useEffect(() => {
    console.log();
    axios.get('/auth/current-session').then(({data}) => { 
      if (data) {
        dispatch(setLogState(true));
        return;
      } 
        dispatch(setLogState(false));
    })
  }, [dispatch])

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

