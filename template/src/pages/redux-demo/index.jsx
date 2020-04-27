import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import mapDispatchToProps from './actions';

class ReduxDemo extends React.Component {
  componentWillUnmount() {
    // 页面卸载，但redux-demo组件的redux状态还是会保留着
    console.log('redux demo unmount....');
  }

  render() {
    const { count, changeMoreValue } = this.props;
    return (
      <div>
        <div>
          <div><NavLink to="/redux-demo">redux-demo页面</NavLink></div>
          <NavLink to="/redux-demo2">redux-demo2页面</NavLink>
        </div>
        <div>redux-demo页面</div>
        <div>计数器：{count}</div>
        <div
          onClick={() => {
            changeMoreValue({
              count: count + 1,
            });
            // 测试，更改count后并不会立即同步的
          }}
        >
          Add
        </div>
        <div
          onClick={() => {
            changeMoreValue({
              count: count - 1,
            });
          }}
        >
          decrement
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.reduxDemo;

// mapDispatchToProps不为null，ReduxDemo组件中没有dispatch属性，除非通过手动传进去，如：
// const mapDispatchToProps = (dispatch) => ({
//   dispatch, // 手动给ReduxDemo传入dispatch属性
//   changeMoreValue: (data) => dispatch(changeMoreValueAction(data)),
// });

// mapDispatchToProps为null，则dispatch属性自动传入ReduxDemo，在ReduxDemo内部可以使用
// dispatch派发action
// export default connect(mapStateToProps, null)(ReduxDemo);


export default connect(mapStateToProps, mapDispatchToProps)(ReduxDemo);
