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
      path: path.resolve(__dirname, '../dist'),
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : 'static/js/[name].js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : 'static/js/[name].chunk.js',
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
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
      splitChunks: {
        // chunks: 'async'只对异步代码生效，比如动态import()，动态import的代码都进行分割，单独打包
        // webpack官网默认的chunks为async，是因为webpack希望我们多运用异步加载模块的方法提高性能，
        // 同步加载模块好处在于可以利用浏览器缓存，异步模块可以提高首页加载效率
        chunks: 'all',
        // minSize，引入的模块大于30kb才进行代码分割，如果小于等于30kb，则不尽兴代码分割
        minSize: 30000,
        // maxSize对模块进行二次拆分，比如如果设置maxSize为50000，即50kb，假如我们引入lodash，lodash打包出来的文件
        // 大小为1mb，大于maxSize，那么splitChunks会尝试对lodash进行二次分割，看看能不能分割成
        // 20个50kb的打包文件
        maxSize: 0,
        // minChunks：1，当一个模块至少被用了1次才进行代码分割。
        minChunks: 1,
        // maxAsyncRequests设置为6，即只对前6个模块进行代码分割，剩下的就不分割了。
        maxAsyncRequests: 2,
        // maxInitialRequests入口文件加载的时候，如果对引入的模块做代码分割，
        // 小于4个文件的时候就会做代码分割，多于4个就不会做代码分割了
        maxInitialRequests: 4,
        automaticNameDelimiter: '/',
        // 分组，对node_modules下的模块进行分割，引入的模块如果是node_module下面的，则进行分割，
        // 如果不是node_modules下面的模块，则运用default规则进行分割.
        cacheGroups: {
          vendors: {
            // 引入的模块是否在node_module下的,如果引入的模块确实是在node_module下，则进行代码分割
            // 如果我们在入口文件index.js里面import _ from 'lodash'，则lodash会被单独打包，打包后的文件名
            // vendors~main.js（如果不指定filename，则命名就是组名+引入的模块文件名）。
            // 其中vendors代表这个包属于splitChunks中的vendors组（cacheGroups），
            // main表示属于index.js这个模块
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            // minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: false,
              },
              loader: 'eslint-loader',
            },
          ],
          include: path.resolve(__dirname, '../src'),
        },
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, '../src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: false,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: {
            loader: 'url-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
              // outputPath: 'files',
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
              // outputPath: 'fonts',
            },
          },
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders(mode, {
            importLoaders: 1,
            sourceMap: false,
          }),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
        // using the extension .module.css
        {
          test: cssModuleRegex,
          use: getStyleLoaders(mode, {
            importLoaders: 1,
            sourceMap: false,
            modules: {
              localIdentName: isEnvProduction ? '[hash:base64]' : '[path][name]__[local]',
            },
          }),
        },
        // Opt-in support for SASS (using .scss or .sass extensions).
        // By default we support SASS Modules with the
        // extensions .module.scss or .module.sass
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: getStyleLoaders(mode,
            {
              importLoaders: 2,
              sourceMap: false,
            },
            'sass-loader'),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules, but using SASS
        // using the extension .module.scss or .module.sass
        {
          test: sassModuleRegex,
          use: getStyleLoaders(
            mode,
            {
              importLoaders: 2,
              sourceMap: false,
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
              sourceMap: false,
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
              sourceMap: false,
              modules: {
                localIdentName: isEnvProduction ? '[hash:base64]' : '[path][name]__[local]',
              },
            },
            'less-loader',
          ),
        },
      ].filter(Boolean),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: true,
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
      }),
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
      }),
      // Automatically load modules instead of having to import or require them everywhere.
      new webpack.ProvidePlugin({}),
    ].filter(Boolean),
  };
};
