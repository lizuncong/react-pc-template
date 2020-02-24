import React from 'react';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Login from 'pages/login';
// import NotFound from 'pages/notfound';
import AdminLayout from 'pages/layout/admin';
import DetailLayout from 'pages/layout/detail';
import Home from 'pages/home';
import StoreList from 'pages/store/list';
import StoreDetail from 'pages/store/detail';

import App from './App';

export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/detail"
              render={() => (
                <DetailLayout>
                  <Switch>
                    <Route path="/detail/order/detail" component={Login} />
                  </Switch>
                </DetailLayout>
              )}
            />
            <Route
              path="/"
              render={() => (
                <AdminLayout>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/store/list" component={StoreList} />
                    <Route path="/store/detail/:storeId?" component={StoreDetail} />
                    <Redirect to="/home" />
                    {/* <Route component={NotFound} /> */}
                  </Switch>
                </AdminLayout>
              )}
            />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}
