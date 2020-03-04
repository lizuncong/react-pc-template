import { connect } from 'react-redux';
import { toggleTodo } from './actions';
import Todo from '.';

export default connect(
  null,
  { toggleTodo },
)(Todo);
