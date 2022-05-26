const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/dstk", {
      target: process.env.REACT_APP_API_HOST,
      changeOrigin: true,
      pathRewrite: {
        "/dstk": "",
      },
    })
  );
};
