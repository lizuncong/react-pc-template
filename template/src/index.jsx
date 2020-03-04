import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './router';
import store from './redux/store';
import './style/common.less';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  rootElement,
);
