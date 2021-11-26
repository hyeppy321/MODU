const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://allcoronainfo.co.kr:5000',
      changeOrigin: true,
    }),
  );
};
