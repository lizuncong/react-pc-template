import React from 'react';
import { Icon } from 'antd';
import styles from './index.module.less';

export default class Login extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <Icon type="bars" />
          <span>缺陷</span>
          <Icon type="plus" />
        </div>
      </div>
    );
  }
}
