import { changeMoreValue } from './action-creators';

// 如果不使用redux-thunk，redux-saga等这些中间件，那么dispatch派发的只能是一个对象。
// 即只能dispatch({ type, payload })
const mapDispatchToProps = (dispatch) => ({
  changeMoreValue: (data) => dispatch(changeMoreValue(data)),
});

export default mapDispatchToProps;
