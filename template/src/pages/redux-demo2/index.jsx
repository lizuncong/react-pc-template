import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import mapDispatchToProps from './actions';

class ReduxDemo2 extends React.Component {
  componentWillUnmount() {
    // 页面卸载，但redux-demo2组件的redux状态还是会保留着
    console.log('redux demo2 unmount....');
  }

  render() {
    const { count2, changeMoreValue, testNameSpaceCount } = this.props;
    return (
      <div>
        <div>
          <div><NavLink to="/redux-demo">redux-demo页面</NavLink></div>
          <NavLink to="/redux-demo2">redux-demo2页面</NavLink>
        </div>
        <div>redux-demo2页面</div>
        <div>redux-demo2的计数器：{count2}</div>
        <div>redux-demo的计数器：{testNameSpaceCount}</div>
        <div
          onClick={() => {
            changeMoreValue({
              count2: count2 + 1,
            });
            // 测试，更改count后并不会立即同步的
          }}
        >
          Add
        </div>
        <div
          onClick={() => {
            changeMoreValue({
              count2: count2 - 1,
            });
          }}
        >
          decrement
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { reduxDemo, reduxDemo2 } = state;
  return { ...reduxDemo, ...reduxDemo2 };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDemo2);
