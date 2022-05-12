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
import Auth0ProviderWithRedirectCallback from './Components/Auth0ProviderWithRedirectCallback.js';

let persistor = persistStore(store);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme} resetCSS={true}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Router>
              <Auth0ProviderWithRedirectCallback>
                <App />
              </Auth0ProviderWithRedirectCallback>
            </Router>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);