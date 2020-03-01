import React from 'react';
import { Icon } from 'antd';
import Test from './test';
import styles from './index.module.less';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    const { count } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <Icon type="bars" />
          <span
            className={styles.test}
            onClick={() => {
              this.setState({
                count: count + 1,
              });
            }}
          >
            测试aaaa:{count}
          </span>
          <Icon type="plus" />
        </div>
        <Test />
      </div>
    );
  }
}
