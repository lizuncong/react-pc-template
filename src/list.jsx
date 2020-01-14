import React from 'react';

class List extends React.Component {
  render() {
    return (
      [1, 2, 3, 4, 5, 7, 8].map((item) => (
        <div key={item}>{item}</div>
      ))
    );
  }
}

export default List;
