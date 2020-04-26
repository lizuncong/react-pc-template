import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import loadable from '@loadable/component';


const Login = loadable(() => import(/* webpackChunkName: "login" */'../pages/login'));
const AdminLayout = loadable(() => import(/* webpackChunkName: "adminLayout" */'../pages/layout/admin'));
const DetailLayout = loadable(() => import(/* webpackChunkName: "detailLayout" */'../pages/layout/detail'));
const Home = loadable(() => import(/* webpackChunkName: "home" */'../pages/home'));
const StoreList = loadable(() => import(/* webpackChunkName: "storeList" */'../pages/store/list'));
const StoreDetail = loadable(() => import(/* webpackChunkName: "storeDetail" */'../pages/store/detail'));
const App = loadable(() => import(/* webpackChunkName: "app" */'../App'));

class IRouter extends React.Component {
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

// export default IRouter;

export default hot(IRouter);
