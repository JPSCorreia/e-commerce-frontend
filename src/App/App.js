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
import { useEffect, useState } from 'react';
import { setLogState, setUsername } from '../Features/isAuthenticatedSlice';
import axios from 'axios';

import { useLazyVerifySessionQuery } from '../Features/apiSlice';
import { useLazyGetUserByUsernameQuery } from '../Features/apiSlice'
// import { useLazyAddUserMutation } from '../Features/apiSlice';

function App() {

  // Redux State/Action Management.
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value)
  const dispatch = useDispatch();

//   const [
//     triggerVerifySession,
//     { data: sessionData }
//    ] = useLazyVerifySessionQuery();

//   const [
//     triggerGetUserByUsername,
//     getUserData,
//   ] = useLazyGetUserByUsernameQuery();

//   // const {
//   //   trigger: triggerAddUser,
//   //   result: newUserData,
//   // } = useLazyAddUserMutation();

//   const verification = () => {
//     triggerVerifySession().then(() => {
//       console.log('1')
//       if (sessionData) {
//         console.log('2')
//         const newUserObj = {
//         "username": sessionData.nickname,
//           "admin": false
//         }
//         console.log(sessionData)
//         dispatch(setUsername(newUserObj.username))
//         if (!isAuthenticated) {
//           triggerGetUserByUsername(newUserObj.username).then(() => {
//             console.log(getUserData)
//             if (getUserData.length < 1) {
//               // triggerAddUser(newUserObj)
//               // console.log(`created new user:`)
//               // console.log(newUserObj)
//                 axios.post(`http://localhost:8080/api/users/`, newUserObj ).then(({newUser}) => {
//                   console.log(`created new user:`)
//                   console.log(newUserObj)
//                 })
//             }
//           })
//         }
//         console.log('==???')
//         dispatch(setLogState(true));
//       }

//       if (!sessionData) {
//         dispatch(setLogState(false));
//         dispatch(setUsername('unregistered visitor'))
//       }
//     })
//   }

// useEffect(() => {
//   verification()
// }, [])




    axios.get('/auth/current-session').then(({data}) => { 
      if (data) {
        const newUserObj = {
          "username": data.nickname,
          "admin": false
        }
        dispatch(setUsername(data.nickname))
        if (!isAuthenticated) {
          axios.get(`http://localhost:8080/api/users/${data.nickname}`).then((result) => {   
            console.log(result) // da undefined e entao cria sempre um novo user na DB
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

