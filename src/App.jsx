import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('test App constructor');
    this.state = {
      count: 0,
    };
  }

  render() {
    const { count } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <div>
            Hello React
          </div>
          <div>{count}</div>
          <div
            onClick={() => {
              this.setState({
                count: count + 1,
              });
            }}
          >
            Click Me To Add Count
          </div>
        </div>
      </div>
    );
  }
}

export default App;
