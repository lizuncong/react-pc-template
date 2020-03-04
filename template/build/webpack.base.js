const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const InlineChunkHtmlPlugin = require('./inlineChunkHtmlPlugin');
const { getStyleLoaders } = require('./utils');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const dllFiles = fs.readdirSync(path.resolve(__dirname, '../dll'));
const dllManifestFiles = dllFiles.filter((name) => name.search(/manifest.json/g) > -1);
module.exports = (mode) => {
  const isEnvProduction = mode === 'production';
  return {
    mode: isEnvProduction ? 'production' : 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? 'cheap-module-source-map'
      : 'cheap-module-eval-source-map',
    entry: {
      main: path.resolve(__dirname, '../src/index.jsx'),
    },
    output: {
      path: isEnvProduction ? path.resolve(__dirname, '../dist') : undefined,
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js',
      futureEmitAssets: true,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        src: path.resolve(__dirname, '../src'),
        pages: path.resolve(__dirname, '../src/pages'),
        components: path.resolve(__dirname, '../src/components'),
        util: path.resolve(__dirname, '../src/utils'),
      },
    },
    optimization: {
      usedExports: true,
      minimize: isEnvProduction,
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
              },
              loader: 'eslint-loader',
            },
          ],
          include: path.resolve(__dirname, '../src'),
        },
        {
          oneOf: [
            {
              test: /\.(png|jpe?g|gif|ico)$/i,
              use: {
                loader: 'url-loader',
                options: {
                  name: 'static/media/[name].[hash:8].[ext]',
                  limit: 8192,
                },
              },
            },
            {
              test: /\.(eot|ttf|svg|woff)$/i,
              use: {
                loader: 'file-loader',
                options: {
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
            },
            {
              test: /\.jsx?$/,
              include: path.resolve(__dirname, '../src'),
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    compact: isEnvProduction,
                  },
                },
              ],
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders(mode, {
                importLoaders: 1,
                sourceMap: isEnvProduction,
              }),
              sideEffects: true,
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders(mode, {
                importLoaders: 1,
                sourceMap: isEnvProduction,
                modules: {
                  localIdentName: isEnvProduction ? '[hash:base64]' : '[path][name]__[local]',
                },
              }),
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(mode,
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction,
                },
                'sass-loader'),
              sideEffects: true,
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                mode,
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction,
                  modules: {
                    localIdentName: isEnvProduction ? '[hash:base64]' : '[path][name]__[local]',
                  },
                },
                'sass-loader',
              ),
            },
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(mode,
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction,
                },
                'less-loader',
                {
                  modifyVars: {
                    '@primary-color': '#1890FF',
                  },
                  javascriptEnabled: true,
                }),
              sideEffects: true,
            },
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                mode,
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction,
                  modules: {
                    localIdentName: isEnvProduction ? '[hash:base64]' : '[path][name]__[local]',
                  },
                },
                'less-loader',
              ),
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        {

          inject: true,
          template: 'src/index.html',
          ...(isEnvProduction
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
            : undefined),
        },
      ),
      isEnvProduction
      && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      // new AddAssetHtmlPlugin({
      //   filepath: path.resolve(__dirname, '../dll/*.dll.js'),
      // }),
      // ...dllManifestFiles.map((filename) => (
      //   new webpack.DllReferencePlugin({
      //     manifest: path.resolve(__dirname, `../dll/${filename}`),
      //   })
      // )),
      new CleanWebpackPlugin(),
      // MiniCssExtractPlugin开发模式下不支持hmr，会影响开发效率，因此不在开发模式配置，只在生产模式下配置
      isEnvProduction
      && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        ignoreOrder: true,
      }),
      // new webpack.ProvidePlugin({}),
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ].filter(Boolean),
    performance: false,
  };
};
