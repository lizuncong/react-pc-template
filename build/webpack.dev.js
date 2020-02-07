const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  module: {
    rules: [],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: '../dist',
    open: true,
    overlay: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/server': {
        target: 'http://www.dell-lee.com',
        // secure: false, // 如果请求的网址是https，需要配置secure: false
        pathRewrite: {
          '/server': '',
        },
        changeOrigin: true,
      },
    },
  },
};

module.exports = merge(baseConfig('development'), devConfig);
