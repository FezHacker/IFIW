const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://aviationweather.gov',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
