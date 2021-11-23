const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://3.13.120.46:5000',
      changeOrigin: true,
    }),
  );
};
