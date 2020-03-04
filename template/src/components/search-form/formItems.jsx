import React from 'react';
import { Input, Select, Button } from 'antd';
import styles from './index.module.less';
import IconFont from '../IconFont';
import RangePicker from '../range-picker';
import InputRange from '../input-range';

const { Option } = Select;

class FormItems extends React.Component {
  constructor(props) {
    super(props);
    this.itemMinWidth = 300;
    this.gridRowHeight = 32;
    this.gridRowGap = 12;
    this.formItemContainer = React.createRef();
    this.handleResize = this.handleResize.bind(this);
    this.state = {
      gridRows: 1, // 网格布局的行数
      gridContainerHeight: '',
      show: false, // 更多
    };
  }

  componentDidMount() {
    this.computedGridRowAndHeight();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // 计算网格的宽高
  computedGridRowAndHeight() {
    const { formItems } = this.props;
    const gridContainerWidth = this.formItemContainer.current.clientWidth;
    const columns = Math.floor(gridContainerWidth / this.itemMinWidth);
    const rows = Math.ceil((formItems.length + 1) / columns);
    const gridContainerHeight = rows * this.gridRowHeight + (rows - 1) * this.gridRowGap;
    this.setState({
      gridRows: rows,
      gridContainerHeight,
    });
  }

  handleResize() {
    this.computedGridRowAndHeight();
  }

  onFormItemChange(itemValue, formItem) {
    const { onValueChange, value } = this.props;
    const newValue = { ...value, ...itemValue };
    onValueChange(newValue, formItem);
  }

  renderFormItem(formItem) {
    const { value, onValueChange } = this.props;
    let formItemView = '';
    switch (formItem.type) {
      case 'select':
        formItemView = (
          <Select
            allowClear
            className={styles.gridItemRight}
            value={value[formItem.dataIndex]}
            mode={formItem.mode}
            maxTagCount={1}
            onChange={(val) => {
              this.onFormItemChange({ [formItem.dataIndex]: val }, formItem);
            }}
          >
            {
              formItem.options && formItem.options.map((item) => (
                <Option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </Option>
              ))
            }
          </Select>
        );
        break;
      case 'dateRange':
        formItemView = (
          <RangePicker
            start={value[formItem.startIndex]}
            end={value[formItem.endIndex]}
            className={styles.gridItemRight}
            ranges={formItem.ranges}
            onChange={(dateStrings) => {
              this.onFormItemChange({
                [formItem.startIndex]: dateStrings[0],
                [formItem.endIndex]: dateStrings[1],
              }, formItem);
            }}
          />
        );
        break;
      case 'inputRange':
        formItemView = (
          <InputRange
            className={styles.gridItemRight}
            start={value[formItem.startIndex]}
            end={value[formItem.endIndex]}
            onChange={(inputValue, dataIndex) => {
              let obj = {
                [formItem.endIndex]: inputValue,
              };
              if (dataIndex === 'start') {
                obj = {
                  [formItem.startIndex]: inputValue,
                };
              }
              const valueObj = {
                [formItem.startIndex]: value[formItem.startIndex],
                [formItem.endIndex]: value[formItem.endIndex],
                ...obj,
              };
              this.onFormItemChange(valueObj, formItem);
            }}
          />
        );
        break;
      default:
        formItemView = (
          <Input
            className={styles.gridItemRight}
            value={value[formItem.dataIndex]}
            placeholder="请输入订单号"
            onKeyDown={(e) => {
              // 回车键
              if (e.keyCode === 13) {
                onValueChange && onValueChange(value, { type: 'enterBtn' });
              }
            }}
            onChange={(e) => {
              const { val } = e.target;
              this.onFormItemChange({ [formItem.dataIndex]: val }, formItem);
            }}
          />
        );
    }

    return formItemView;
  }

  render() {
    const { formItems, onValueChange, value } = this.props;
    const { gridRows, gridContainerHeight, show } = this.state;
    const gridStyle = {
      gridTemplateColumns: `repeat(auto-fill, minmax(${this.itemMinWidth}px, 1fr))`,
      gridTemplateRows: `${this.gridRowHeight}px`,
      gridRowGap: `${this.gridRowGap}px`,
    };
    if (gridContainerHeight) {
      gridStyle.height = `${show ? gridContainerHeight : this.gridRowHeight}px`;
    }
    return (
      <div
        className={styles.gridContainer}
        style={gridStyle}
        ref={this.formItemContainer}
      >
        {
            formItems.map((formItem) => (
              <div key={formItem.dataIndex || formItem.startIndex} className={styles.gridItem}>
                <div className={styles.gridItemLeft}>{formItem.title}</div>：
                {this.renderFormItem(formItem)}
              </div>
            ))
          }
        <div className={styles.btn}>
          {
              gridRows > 1
                ? (
                  <span
                    className={styles.more}
                    onClick={() => {
                      this.setState({
                        show: !show,
                      });
                    }}
                  >
                    更多
                    <IconFont className={[styles.icon, show && styles.up].join(' ')} type="icon-Down" />
                  </span>
                )
                : ''
            }
          <Button
            type="primary"
            icon="search"
            className={styles.search}
            onClick={() => {
              onValueChange && onValueChange(value, { type: 'searchBtn' });
            }}
          >
            搜索
          </Button>
          <Button
            type="primary"
            icon="reload"
            onClick={() => {
              onValueChange && onValueChange({}, { type: 'resetBtn' });
            }}
          >
            重置
          </Button>
        </div>
      </div>
    );
  }
}

export default FormItems;
