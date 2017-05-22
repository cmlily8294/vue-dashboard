var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/entry.js']
  },
  dist: '../app',
  template: './index.tpl',

  devServer: {
    port: 8092,
    hostname:'localhost',
    publicPath: 'http://localhost:8092/',
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      '/opmp/v1/*': {
        target: 'http://192.168.50.100:8080',
        changeOrigin: true
      }
    }
  },

  // production
  clean: true,
  hash: true,
  sourceMap: true,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: './',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'buble', 'autoprefixer']
});

module.exports = cooking.resolve();
