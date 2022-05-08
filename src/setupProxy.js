const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function (app) {
    app.use(proxy(`/auth/**`, { target: 'https://e-commerce-backend2.herokuapp.com' }));
};
