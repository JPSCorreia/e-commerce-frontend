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
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './extendTheme.js';
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
// const redirectUri = process.env.REACT_APP_REDIRECT_URI;

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ChakraProvider theme={theme} resetCSS={true}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Auth0Provider
              domain={domain}
              clientId={clientId}
              redirectUri={window.location.origin}
            >
              <App />
            </Auth0Provider>
          </ChakraProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);