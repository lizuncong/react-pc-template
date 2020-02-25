import React from 'react';
import loadable from '@loadable/component';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';

// import NotFound from 'pages/notfound';

const Login = loadable(() => import(/* webpackChunkName: "login" */'pages/login'));
const AdminLayout = loadable(() => import(/* webpackChunkName: "adminLayout" */'pages/layout/admin'));
const DetailLayout = loadable(() => import(/* webpackChunkName: "detailLayout" */'pages/layout/detail'));
const Home = loadable(() => import(/* webpackChunkName: "home" */'pages/home'));
const StoreList = loadable(() => import(/* webpackChunkName: "storeList" */'pages/store/list'));
const StoreDetail = loadable(() => import(/* webpackChunkName: "storeDetail" */'pages/store/detail'));
const App = loadable(() => import(/* webpackChunkName: "app" */'./App'));

// import Login from 'pages/login';
// import AdminLayout from 'pages/layout/admin';
// import DetailLayout from 'pages/layout/detail';
// import Home from 'pages/home';
// import StoreList from 'pages/store/list';
// import StoreDetail from 'pages/store/detail';
// import App from './App';

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
