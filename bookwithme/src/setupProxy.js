﻿const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/weatherforecast",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7159',
        secure: false
    });

    app.use(appProxy);
};
