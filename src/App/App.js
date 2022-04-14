import '../Style/App.css';
import * as React from 'react';
import RegisterPage from '../Components/RegisterPage'
import LoginPage from '../Components/LoginPage'
import UserList from '../Components/UserList'
import ProductList from '../Components/ProductList'
import CartList from '../Components/CartList'
import { Routes, Route, useLocation, useNavigate } from "react-router";
import { Navigate } from "react-router";
import NavBar from '../Components/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginNow, logoutNow } from '../Features/isAuthenticatedSlice';


function App() {

  // Redux State/Action Management.
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value)
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginNow = () => {
    if (!isAuthenticated) {
      dispatch(loginNow())
      console.log('Logging in')
    }
  }

  const handleLogoutNow = () => {
    if (isAuthenticated) {
      dispatch(logoutNow())
      console.log('Logging out')
    }
  }

  async function isAuth() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/is-verify`, {
        method: 'GET',
        headers: {token: localStorage.token}
      })
      // get token
      const parseRes = await response.json()
      parseRes === true? handleLoginNow() : handleLogoutNow()
    } catch (error) {
      console.error(error.message)
    }
  }

  

  useEffect(() => {
    if(location.pathname !== '/register' && location.pathname !== '/login') {
      isAuth();
    }
  })


  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route exact path="/" element={ isAuthenticated?  <Navigate to="/users" /> : <Navigate to="/login" />}>
      </Route>
      <Route path="/login" element={ isAuthenticated?  <Navigate to="/users" /> : <LoginPage /> }>
      </Route>
      <Route path="/register" element={ isAuthenticated? <Navigate to="/users" /> : <RegisterPage /> }>
      </Route>
      <Route path="/users" element={ isAuthenticated? <UserList /> : <Navigate to="/login" /> }>
      </Route>
      <Route path="/products" element={ isAuthenticated? <ProductList /> : <Navigate to="/login" /> }>
      </Route>
      <Route path="/cart" element={ isAuthenticated? <CartList /> : <Navigate to="/login" /> }>
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

