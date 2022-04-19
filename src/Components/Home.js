import '../Style/App.css';
import * as React from 'react';

function Home() {

  return(
    <div className='Home'>
      <h1>Home</h1>
      <p>
        You are not logged in
      </p>
      <a
        className="App-link"
        href={"/auth/login"}
      >
        Login Here
      </a>
    </div>
  )
}

export default Home;