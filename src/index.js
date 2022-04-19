import React from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import './Style/normalize.css'
import { Provider } from "react-redux";
import App from './App/App';
import store from './Features/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { BrowserRouter as Router } from 'react-router-dom';

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);