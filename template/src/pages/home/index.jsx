import React from 'react';
import AddTodo from './components/addTodo/connect';
import TodoList from './components/todoList/connect';
import VisibilityFilters from './components/visibilityFilters/connect';

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <AddTodo />
        <VisibilityFilters />
        <TodoList />
      </div>
    );
  }
}
