import React from 'react';
import './app.less';

class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="app">
        {children}
      </div>
    );
  }
}


export default App;
