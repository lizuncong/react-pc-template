import { combineReducers } from 'redux';
import reduxDemo from '../../pages/redux-demo/reducer';
import reduxDemo2 from '../../pages/redux-demo2/reducer';
import currentMenu from '../../pages/layout/admin/navLeft/reduce';

export default combineReducers({
  reduxDemo,
  reduxDemo2,
  currentMenu,
});
