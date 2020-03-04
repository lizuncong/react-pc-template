const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: {
    vendors: ['lodash', 'moment'],
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].[hash].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    }),
  ],
};
