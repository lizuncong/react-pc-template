import { hot } from 'react-hot-loader/root';
import React from 'react';
import importedComponent from 'react-imported-component';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';

const Login = importedComponent(() => import(/* webpackChunkName: "login" */'../pages/login'));
const AdminLayout = importedComponent(() => import(/* webpackChunkName: "adminLayout" */'../pages/layout/admin'));
const DetailLayout = importedComponent(() => import(/* webpackChunkName: "detailLayout" */'../pages/layout/detail'));
const Home = importedComponent(() => import(/* webpackChunkName: "home" */'../pages/home'));
const StoreList = importedComponent(() => import(/* webpackChunkName: "storeList" */'../pages/store/list'));
const StoreDetail = importedComponent(() => import(/* webpackChunkName: "storeDetail" */'../pages/store/detail'));
const App = importedComponent(() => import(/* webpackChunkName: "app" */'../App'));

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
