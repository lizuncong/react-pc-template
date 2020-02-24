import React from 'react';
import styles from './index.module.less';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    const { checkValue } = props;
    this.checkValue = checkValue !== undefined ? checkValue : '1';
  }

  render() {
    // checkValue选中的值，如果指定，则用指定的，不指定则默认用'1'
    const {
      className, title, onChange, value,
    } = this.props;
    return (
      <span
        className={[styles.checkBox, className, value === this.checkValue && styles.checked].join(' ')}
        onClick={() => {
          onChange(value === this.checkValue ? '' : this.checkValue);
        }}
      >
        {title}
      </span>
    );
  }
}

export default CheckBox;
