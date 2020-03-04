import { connect } from 'react-redux';
import Header from '.';

const mapStateToProps = (state) => {
  const { currentMenu } = state;
  return {
    menuName: currentMenu.menuName,
  };
};

export default connect(mapStateToProps)(Header);
