import React, { Suspense, lazy } from 'react';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';

// import NotFound from 'pages/notfound';

const Login = lazy(() => import('pages/login'));
const AdminLayout = lazy(() => import('pages/layout/admin'));
const DetailLayout = lazy(() => import('pages/layout/detail'));
const Home = lazy(() => import('pages/home'));
const StoreList = lazy(() => import('pages/store/list'));
const StoreDetail = lazy(() => import('pages/store/detail'));
const App = lazy(() => import('./App'));

export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </HashRouter>
    );
  }
}
