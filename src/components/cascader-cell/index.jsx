import React from 'react';
import { Cascader } from 'antd';
import styles from './index.module.less';

class CascaderCell extends React.Component {
  render() {
    const {
      title, value, options, required, onChange, className, fieldNames,
    } = this.props;
    return (
      <div
        className={[styles.row, className].join(' ')}
      >
        <div className={styles.left}>
          { required ? <span className={styles.red}>*</span> : ''}
          {title}：
        </div>
        <Cascader
          options={options}
          onChange={(val) => onChange(val)}
          placeholder="请选择"
          className={styles.right}
          value={value}
          fieldNames={fieldNames}
        />
      </div>
    );
  }
}

export default CascaderCell;
