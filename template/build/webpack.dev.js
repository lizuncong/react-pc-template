const webpack = require('webpack');
const merge = require('webpack-merge');
const WatchMissingNodeModulesPlugin = require('./watchMissingNodeModulesPlugin');
const baseConfig = require('./webpack.base');
const { resolveApp } = require('./utils');

const devConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new WatchMissingNodeModulesPlugin(resolveApp('node_modules')),
  ],
  devServer: {
    contentBase: '../dist',
    open: true,
    overlay: true,
    hot: true,
    port: 8008,
    historyApiFallback: true,
    // proxy: {
    // '/server': {
    //   target: 'http://localhost:8080',
    //   // secure: false, // 如果请求的网址是https，需要配置secure: false
    //   pathRewrite: {
    //     '/server': '',
    //   },
    //   changeOrigin: true,
    // },
    // },
  },
};

const config = merge(baseConfig('development'), devConfig);
module.exports = config;
