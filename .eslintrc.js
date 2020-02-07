module.exports = {
  parser: "Espree", // ESLint默认的解析器，如果需要使用types(Flow)或者ESLint不支持的实验性语法，则使用Babel-ESLint
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
  plugins: [
    'react',
  ],
  rules: {
    "react/prefer-stateless-function": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-console": "off"
  },
};
