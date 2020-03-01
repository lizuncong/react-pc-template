import React from 'react';
import Todo from '../todo/connect';
import styles from './index.module.less';

class TodoList extends React.Component {
  render() {
    const { todos } = this.props;
    return (
      <div className={styles.todoList}>
        {
            todos && todos.length
              ? todos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                />
              ))
              : <div className={styles.noData}>没有符合条件的数据</div>
          }
      </div>
    );
  }
}

export default TodoList;
