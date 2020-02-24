import React from 'react';
import SearchForm from 'components/search-form';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.formItems = [
      {
        title: '关键字',
        dataIndex: 'searchKey',
        type: 'input',
      },
      {
        title: '备货类型',
        dataIndex: 'prepareType',
        type: 'select',
        mode: 'multiple',
        options: [
          {
            label: '备货1',
            value: '1',
          },
          {
            label: '备货2',
            value: '2',
          },
          {
            label: '备货3',
            value: '3',
          },
        ],
      },
      {
        title: '产品分类',
        dataIndex: 'productCategory',
        type: 'select',
        options: [
          {
            label: '备货1',
            value: '1',
          },
          {
            label: '备货2',
            value: '2',
          },
          {
            label: '备货3',
            value: '3',
          },
        ],
      },
      {
        title: '送货日期',
        startIndex: 'sendTimeStart',
        endIndex: 'sendTimeEnd',
        type: 'dateRange',
        ranges: 30,
      },
      {
        title: '下单日期',
        startIndex: 'orderTimeStart',
        endIndex: 'orderTimeEnd',
        type: 'dateRange',
      },
      {
        title: '输入范围',
        startIndex: 'dayRangeStart',
        endIndex: 'dayRangeEnd',
        type: 'inputRange',
      },
    ];
    this.otherItems = [
      {
        title: '首单',
        type: 'checkBox',
        dataIndex: 'firstOrder',
      },
      {
        title: '首单1',
        type: 'checkBox',
        checkValue: 0,
        dataIndex: 'firstOrder1',
      },
      {
        title: '首单2',
        type: 'checkBox',
        checkValue: '1',
        dataIndex: 'firstOrder2',
      },
      {
        title: '首单3',
        type: 'checkBox',
        checkValue: '0',
        dataIndex: 'firstOrder1',
      },
      {
        title: '首单4',
        type: 'checkBox',
        checkValue: '1',
        dataIndex: 'firstOrder4',
      },
      {
        title: '下单时间',
        type: 'sort',
        dataIndex: 'orderTimeSort',
      },
      {
        title: '送货时间',
        type: 'sort',
        dataIndex: 'sendTimeSort',
        sortValues: ['1', '2'],
      },
    ];
    this.state = {
      searchCondition: {},
    };
  }

  render() {
    const { searchCondition } = this.state;
    return (
      <SearchForm
        formItems={this.formItems}
        otherItems={this.otherItems}
        value={searchCondition}
        onValueChange={(value) => {
          console.log('user search value.....', value);
          this.setState({
            searchCondition: value,
          });
        }}
      />
    );
  }
}


export default Search;
