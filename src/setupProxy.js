const proxy = require('http-proxy-middleware').createProxyMiddleware;

const backendURL = process.env.REACT_APP_IN_DEVELOPMENT
  ? process.env.REACT_APP_BACKEND_URL
  : process.env.REACT_APP_PUBLIC_BACKEND_URL;

module.exports = function (app) {
  app.use(proxy(`/auth/**`, { target: `${backendURL}` }));
};
