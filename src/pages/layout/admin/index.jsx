import React from 'react';
import NavLeft from './navLeft/connect';
import Header from './header/connect';
import styles from './index.module.less';

export default class Index extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <NavLeft />
        <div className={styles.main}>
          <Header />
          {children}
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}
