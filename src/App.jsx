import { hot } from 'react-hot-loader/root';
import React from 'react';
import './App.css';
import styles from './App.module.css';
import Child from './child';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('test App constructor');
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const promise = new Promise(() => {

    });
    console.log(promise);
  }

  render() {
    const { count } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <div className="title">
            Hello React
          </div>
          <div className={styles.count}>{count}</div>
          <div
            onClick={() => {
              this.setState({
                count: count + 1,
              });
            }}
          >
            Click Me
          </div>
        </div>
        <Child />
      </div>
    );
  }
}

export default hot(App);
