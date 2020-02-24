import React from 'react';
import styles from './index.module.less';

/*
* sortValues
* 如果不传sortValues，默认用[1, 0], 数组第一项表示升序，第二项表示降序
* */
class SortBox extends React.Component {
  constructor(props) {
    super(props);
    const { sortValues } = this.props;
    this.sortValues = sortValues && sortValues.length ? sortValues : [1, 0];
  }

  render() {
    const {
      className, title, value, onChange,
    } = this.props;
    const index = this.sortValues.findIndex((item) => item === value);
    return (
      <span
        className={[styles.sortBox, className,
          index > -1 && styles.high,
          !index && styles.top,
          index === 1 && styles.down,
        ].join(' ')}
        onClick={() => {
          onChange(this.sortValues[index + 1]);
        }}
      >
        {title}
      </span>
    );
  }
}

export default SortBox;
