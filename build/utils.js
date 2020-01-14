const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.getStyleLoaders = (mode, cssOptions, preProcessor) => {
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
      },
    );
  }
  return loaders;
};
