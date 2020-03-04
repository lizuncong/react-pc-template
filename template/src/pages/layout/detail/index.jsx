import React from 'react';

class DetailLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default DetailLayout;
