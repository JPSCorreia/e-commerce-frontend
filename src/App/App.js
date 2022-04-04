import '../Style/App.css';
import * as React from 'react';
import RegisterPage from '../Components/RegisterPage'
import LoginPage from '../Components/LoginPage'
import UserList from '../Components/UserList'
import { Routes, Route } from "react-router";
import { Navigate } from "react-router";
import NavBar from '../Components/NavBar';

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route exact path="/" element={<Navigate to="/login" /> }>
      </Route>
      <Route path="/login" element={<LoginPage />}>
      </Route>
      <Route path="/register" element={<RegisterPage />}>
      </Route>
      <Route path="/users" element={<UserList />}>
      </Route>
      </Routes>
    </div>
  );
}

export default App;
