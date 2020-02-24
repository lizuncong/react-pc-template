import { connect } from 'react-redux';
import Header from './index';

const mapStateToProps = (state) => {
  const { currentMenu } = state;
  return {
    menuName: currentMenu.menuName,
  };
};

export default connect(mapStateToProps)(Header);
