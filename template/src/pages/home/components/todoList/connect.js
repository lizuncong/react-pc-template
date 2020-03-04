import { connect } from 'react-redux';
import TodoList from '.';

// 'all', 'completed', 'incomplete'

const mapStateToProps = (state) => {
  const { visibilityFilter, todos: { allIds, byIds } } = state;
  const todoList = allIds.map((id) => (visibilityFilter === 'all'
        || (visibilityFilter === 'completed' && byIds[id].completed)
        || (visibilityFilter === 'incomplete' && !byIds[id].completed) ? {
      ...byIds[id],
      id,
    } : '')).filter(Boolean);

  console.log('todoList....', todoList);
  return { todos: todoList };
};

export default connect(mapStateToProps)(TodoList);
