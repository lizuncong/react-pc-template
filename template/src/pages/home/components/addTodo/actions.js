import { ADD_TODO } from './actionTypes';

let nextTodoId = 0;
export const addTodo = (content) => {
  nextTodoId += 1;
  return {
    type: ADD_TODO,
    payload: {
      id: nextTodoId,
      content,
    },
  };
};
