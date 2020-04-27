import { changeMoreValue } from './action-creators';

const mapDispatchToProps = (dispatch) => ({
  changeMoreValue: (data) => dispatch(changeMoreValue(data)),
});

export default mapDispatchToProps;
