import React from 'react';
import styles from './index.module.less';

class Todo extends React.Component {
  render() {
    const { todo, toggleTodo } = this.props;
    return (
      <div
        className={styles.todoItem}
        onClick={() => {
          toggleTodo(todo.a.id);
        }}
      >
        <div>
          {todo.content}
        </div>
        <div>{todo.completed ? '已办的' : '待办的'}</div>
      </div>
    );
  }
}

export default Todo;
