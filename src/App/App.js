import '../Style/App.css';
import * as React from 'react';
import Login from '../Components/LoginForm';
import GetButton from '../Components/GetButton';

function App() {

  return (
    <div className="App">
      <Login />
      <GetButton />
    </div>
  );
}

export default App;
