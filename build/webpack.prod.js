const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');


const prodConfig = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            // 打包移除console语句
            drop_console: true,
          },
        },
      }),
      // 压缩css文件
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [],
  },
  plugins: [

  ],
};

module.exports = merge(baseConfig('production'), prodConfig);
