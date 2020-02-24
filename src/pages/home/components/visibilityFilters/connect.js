import { connect } from 'react-redux';
import VisibilityFilter from './index';
import { setFilter } from './actions';


const mapStateToProps = (state) => ({ activeFilter: state.visibilityFilter });
// export default VisibilityFilters;
export default connect(
  mapStateToProps,
  { setFilter },
)(VisibilityFilter);
