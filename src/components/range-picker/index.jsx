import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

class CRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstSelectedDate: '', // 第一个选中的日期
    };
  }

  render() {
    const {
      className, ranges, onChange, start, end,
    } = this.props;
    const { firstSelectedDate } = this.state;
    const dateRange = ranges - 1;
    const value = start ? [moment(start), moment(end)] : [];
    return (
      <RangePicker
        className={className}
        value={value}
        placeholder={['开始日期', '结束日期']}
        disabledDate={(currentDate) => {
          if (!ranges || !firstSelectedDate) return false;
          return currentDate.diff(firstSelectedDate, 'days') > dateRange
                  || firstSelectedDate.diff(currentDate, 'days') > dateRange;
        }}
        onCalendarChange={(dates) => {
          if (dates && dates.length === 1) {
            this.setState({
              firstSelectedDate: dates[0],
            });
          }
        }}
        onChange={(dates, dateStrings) => {
          console.log('dateStrings....', dateStrings);
          onChange && onChange(dateStrings);
        }}
        onOpenChange={(status) => {
          if (!status && firstSelectedDate) {
            this.setState({
              firstSelectedDate: '',
            });
          }
        }}
      />
    );
  }
}

export default CRangePicker;
