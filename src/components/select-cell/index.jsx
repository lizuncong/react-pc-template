import React from 'react';
import { Select } from 'antd';
import styles from './index.module.less';

const { Option } = Select;

class InputCell extends React.Component {
  render() {
    const {
      title, options, value, required,
      showSearch,
      placeholder, onChange, onSearch, className,
      optionLabelProp,
      labelInValue,
      renderOption,
    } = this.props;
    return (
      <div
        className={[styles.row, className].join(' ')}
      >
        <div className={styles.left}>
          { required ? <span className={styles.red}>*</span> : ''}
          {title}：
        </div>
        <Select
          className={styles.right}
          showSearch
          value={value}
          placeholder={placeholder || showSearch ? '请输入关键字查询' : `请选择${title}`}
          filterOption={false}
          onSearch={onSearch}
          onChange={onChange}
          notFoundContent={null}
          labelInValue={labelInValue}
          optionLabelProp={optionLabelProp || 'name'}
        >
          {
              options.map((option) => (
                <Option key={option.value} {...option}>
                  {
                    renderOption
                      ? renderOption(option)
                      : option.name
                  }
                </Option>
              ))
            }
        </Select>
      </div>
    );
  }
}

export default InputCell;
