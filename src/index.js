import React from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import { Provider } from "react-redux";
import App from './App/App';
import { store } from './Features/store';
// import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
    
        <App />
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
