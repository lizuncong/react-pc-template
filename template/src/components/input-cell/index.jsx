import React from 'react';
import { Input } from 'antd';
import styles from './index.module.less';

class InputCell extends React.Component {
  render() {
    const {
      title, value, type, digits, required, onChange, className,
    } = this.props;
    return (
      <div
        className={[styles.row, className].join(' ')}
      >
        <div className={styles.left}>
          { required ? <span className={styles.red}>*</span> : ''}
          {title}：
        </div>
        <Input
          placeholder={`请输入${title}`}
          className={styles.right}
          value={value}
          onChange={(e) => {
            let { val } = e.target;
            if (type === 'int') {
              val = val.replace(/[^\d]/g, '');
              if (digits && val.length > digits) return;
            }
            onChange(val);
          }}
        />
      </div>
    );
  }
}

export default InputCell;
