import React from 'react';
import styles from './index.module.less';
import './header.less';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'lzc',
    };
  }

  render() {
    const { menuName } = this.props;
    const { userName } = this.state;
    return (
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.breadcrumb}>{menuName}</div>
        </div>
        <div className={styles.right}>
          <span>欢迎，{userName}</span>
          <span className="logout-btn" href="#">退出</span>
        </div>
      </div>
    );
  }
}

export default Header;
