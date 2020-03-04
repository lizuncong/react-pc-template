import { combineReducers } from 'redux';
import visibilityFilter from '../../pages/home/components/visibilityFilters/reduce';
import todos from '../../pages/home/components/todoList/reduce';
import currentMenu from '../../pages/layout/admin/navLeft/reduce';

export default combineReducers({
  visibilityFilter,
  todos,
  currentMenu,
});
