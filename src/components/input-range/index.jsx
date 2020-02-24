import React from 'react';
import { Input } from 'antd';
import { isNumeric } from '../../config/constant';
import styles from './index.module.less';

class InputRange extends React.Component {
  onInputChange(dataIndex, e) {
    const { onChange } = this.props;
    const { value } = e.target;
    const replaceValue = value.replace(isNumeric, '');
    // 过滤掉0开头的，比如001，00，01等等
    if (replaceValue[0] === '0' && replaceValue.length > 1) return;
    // if(dataIndex === 'end' && start){
    //   if(this.endInputTimeOut) window.clearTimeout(this.endInputTimeOut)
    //   this.endInputTimeOut = window.setTimeout(() => {
    //     if(Number(start) > Number(replaceValue)){
    //       onChange(start, 'end')
    //     }
    //   }, 1000)
    // }
    onChange(replaceValue, dataIndex);
  }

  render() {
    const { className, start, end } = this.props;
    return (
      <div className={[styles.inputRangeContainer, className].join(' ')}>
        <Input
          className={styles.input}
          value={start}
          onChange={() => this.onInputChange('start')}
        />
        <div className={styles.split} />
        <Input
          className={styles.input}
          value={end}
          onChange={() => this.onInputChange('end')}
        />
      </div>
    );
  }
}

export default InputRange;
