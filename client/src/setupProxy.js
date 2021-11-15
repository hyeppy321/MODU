const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://54.180.157.63:5000',
      changeOrigin: true,
    }),
  );
};
