import { connect } from 'react-redux';
import AddTodo from '.';
import { addTodo } from './actions';

export default connect(
  null,
  { addTodo },
)(AddTodo);
