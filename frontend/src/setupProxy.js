const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * @param {import('express').Express} app
 * */
module.exports = function setupProxy(app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: process.env.BACKEND_URL,
            changeOrigin: true,
            pathRewrite: { "^/api/": "/" },
        })
    );
};
