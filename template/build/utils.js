const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


exports.getStyleLoaders = (mode, cssOptions, preProcessor, preProcessorOptions) => {
  const isEnvDevelopment = mode === 'development';
  const isEnvProduction = mode === 'production';
  const loaders = [
    isEnvDevelopment && 'style-loader',
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: preProcessor,
        options: { sourceMap: true, ...preProcessorOptions },
      },
    );
  }
  return loaders;
};

const appDirectory = fs.realpathSync(process.cwd());
exports.resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
