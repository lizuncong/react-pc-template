import React from 'react';
import styles from './index.module.less';

class NotFound extends React.Component {
  render() {
    return (
      <div className={styles.notFoundContainer}>
        404 Not Found
      </div>
    );
  }
}

export default NotFound;
