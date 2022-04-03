import '../Style/App.css';
import * as React from 'react';
import Login from './Components/LoginForm';
import GetButton from './Components/GetButton';

function LoginPage() {

  return(
    <div className='LoginPage'>
      <Login />
      <GetButton />
    </div>
  )
}

export default LoginPage;