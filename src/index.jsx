import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter, Route, Link, Switch,
} from 'react-router-dom';
import List from './list';
import Home from './home';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/list">
              <List />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
