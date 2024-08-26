import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const TodoStore = (set) => ({
  todoStore: [],

  addTodo: (todo) => {
    set((state) => ({
      todoStore: [...state.todoStore, todo],
    }));
  },

  removeTodo: (id) => {
    set((state) => ({
      todoStore: state.todoStore.filter((todo) => todo.id !== id),
    }));
  },

  completeTodo: (id) => {
    set((state) => ({
      todoStore: state.todoStore.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  updateTodo: (updatedTodo) => {
    set((state) => ({
      todoStore: state.todoStore.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ),
    }));
  },
});

const useTodoStore = create(devtools(persist(TodoStore, { name: "todo" })));

export default useTodoStore;
