import { changeMoreValueAction } from './action-creators';

const mapDispatchToProps = (dispatch) => ({
  changeMoreValue: (data) => dispatch(changeMoreValueAction(data)),
});

export default mapDispatchToProps;
