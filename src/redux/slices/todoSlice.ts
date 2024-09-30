import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  text: string;
  completed: boolean;
}

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [] as Todo[],  // Ensuring proper typing
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo: Todo) => todo.text === action.payload);
      if (todo) {
        todo.completed = !todo.completed;  // Toggle completed status
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo: Todo) => todo.text !== action.payload);
    },
    completeTodo: (state, action) => {
      const todo = state.todos.find((todo: Todo) => todo.text === action.payload);
      if (todo) {
        todo.completed = true;  // Directly set the status to true
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, completeTodo } = todoSlice.actions;

export default todoSlice.reducer;
