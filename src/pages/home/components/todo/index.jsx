import React from 'react';
import styles from './index.module.less';

class Todo extends React.Component {
  render() {
    const { todo, toggleTodo } = this.props;
    return (
      <div
        className={styles.todoItem}
        onClick={() => {
          toggleTodo(todo.id);
        }}
      >
        <div>
          {todo.content}
        </div>
        <div>
          {
            todo.completed ? 'fff已办的' : 'aaa待办的'
          }
        </div>
      </div>
    );
  }
}

export default Todo;
