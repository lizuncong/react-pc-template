import React from 'react';
import styles from './test.module.less';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    const { count } = this.state;
    return (
      <div
        className={styles.child}
        onClick={() => {
          this.setState({
            count: count + 1,
          });
        }}
      >
        自元素测试: { count }
      </div>
    );
  }
}
