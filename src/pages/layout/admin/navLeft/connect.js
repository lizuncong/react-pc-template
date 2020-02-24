import { connect } from 'react-redux';
import { switchMenu } from './actions';
import NavLeft from './index';

export default connect(null, {
  switchMenu,
})(NavLeft);
