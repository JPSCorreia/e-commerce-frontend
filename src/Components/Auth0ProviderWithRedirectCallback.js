import { useNavigate } from 'react-router';
import { Auth0Provider } from '@auth0/auth0-react';

function Auth0ProviderWithRedirectCallback ({ children }) {

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  const scope = 'openid email profile'
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate( appState?.returnTo || window.location.pathname);

  };


  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
      scope={scope}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithRedirectCallback;
