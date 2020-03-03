import { hot } from 'react-hot-loader/root';
import React from 'react';
// import loadable from '@loadable/component';
import importedComponent from 'react-imported-component';
// import Loadable from 'react-loadable';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';

// import NotFound from 'pages/notfound';

// const Login = loadable(() => import(/* webpackChunkName: "login" */'pages/login'));
// const AdminLayout =
// loadable(() => import(/* webpackChunkName: "adminLayout" */'pages/layout/admin'));
// const DetailLayout =
// loadable(() => import(/* webpackChunkName: "detailLayout" */'pages/layout/detail'));
// const Home = loadable(() => import(/* webpackChunkName: "home" */'pages/home'));
// const StoreList = loadable(() => import(/* webpackChunkName: "storeList" */'pages/store/list'));
// const StoreDetail =
// loadable(() => import(/* webpackChunkName: "storeDetail" */'pages/store/detail'));
// const App = loadable(() => import(/* webpackChunkName: "app" */'./App'));
//
// import Login from 'pages/login';
// import AdminLayout from 'pages/layout/admin';
// import DetailLayout from 'pages/layout/detail';
// import Home from 'pages/home';
// import StoreList from 'pages/store/list';
// import StoreDetail from 'pages/store/detail';
// import App from './App';


// const Login = Loadable({
//   loader: () => import('pages/login'),
//   loading() {
//     return <div>Loading...</div>;
//   },
// });
// const AdminLayout = Loadable({
//   loader: () => import('pages/layout/admin'),
//   loading() {
//     return <div>Loading...</div>;
//   },
// });
// const DetailLayout = Loadable({
//   loader: () => import('pages/layout/detail'),
//   loading() {
//     return <div>Loading...</div>;
//   },
// });
//
// const Home = Loadable({
//   loader: () => import('pages/home'),
//   loading() {
//     return <div>Loading...</div>;
//   },
// });
// const StoreList = Loadable({
//   loader: () => import('pages/store/list'),
//   loading() {
//     return <div>Loading...</div>;
//   },
// });
// const StoreDetail = Loadable({
//   loader: () => import('pages/store/detail'),
//   loading() {
//     return <div>Loading...</div>;
//   },
// });
// const App = Loadable({
//   loader: () => import('./App'),
//   loading() {
//     return <div>Loading...</div>;
//   },
// });

const Login = importedComponent(() => import(/* webpackChunkName: "login" */'pages/login'));
const AdminLayout = importedComponent(() => import(/* webpackChunkName: "adminLayout" */'pages/layout/admin'));
const DetailLayout = importedComponent(() => import(/* webpackChunkName: "detailLayout" */'pages/layout/detail'));
const Home = importedComponent(() => import(/* webpackChunkName: "home" */'pages/home'));
const StoreList = importedComponent(() => import(/* webpackChunkName: "storeList" */'pages/store/list'));
const StoreDetail = importedComponent(() => import(/* webpackChunkName: "storeDetail" */'pages/store/detail'));
const App = importedComponent(() => import(/* webpackChunkName: "app" */'./App'));

class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
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
        {/* </Suspense> */}
      </HashRouter>
    );
  }
}

// export default IRouter;

export default hot(IRouter);
