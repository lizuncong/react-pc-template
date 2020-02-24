module.exports = {
  parser: "babel-eslint", // ESLint默认的解析器，如果需要使用types(Flow)或者ESLint不支持的实验性语法，则使用Babel-ESLint
  env: {
    browser: true, // 浏览器全局变量
    es6: true, // 允许所有的ES6特性，除了modules。
  },
  extends: [
    'plugin:react/recommended', // eslint-plugin-react
    'airbnb', // eslint-config-airbnb
  ],
  globals: {
    MYVARIABLE: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // ES9。
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.dev.js',
      },
    },
  },
  plugins: [
    'import',
    'react',
  ],
  rules: {
    "react/prefer-stateless-function": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-console": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "no-unused-expressions": "off",
    "no-async-promise-executor": "off",
    "no-await-in-loop": "off",
    "prefer-promise-reject-errors": "off",
    "consistent-return": "off",
    "react/sort-comp": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "off",
    "react/no-deprecated": "off",
    "react/no-array-index-key": "warn",
    "react/jsx-props-no-spreading": "off",
    'import/first': 'error',
    'import/no-amd': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/prefer-default-export': 'off',
  },
};
