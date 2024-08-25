import { Box, Button, Card, Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";
import useTodoStore from "./stores/TodoStore";

const Todo = () => {
  const { todoStore, addTodo, removeTodo, completeTodo } = useTodoStore(
    (state) => state
  );

  const [todoValue, setTodoValue] = useState({
    id: "",
    data: "",
    completed: false,
  });

  const handleChange = (e) => {
    setTodoValue((prv) => ({
      ...prv,
      data: e.target.value,
    }));
  };

  const handleClick = () => {
    if (todoValue.data !== "") {
      addTodo({
        ...todoValue,
        id: Math.floor(Math.random() * 1000),
        completed: false,
      });
      setTodoValue({
        id: "",
        data: "",
        completed: false,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  const handleRemoveTodo = (id) => {
    removeTodo(id);
  };

  const handleCheckboxChange = (id) => {
    completeTodo(id);
  };

  return (
    <Box className="flex justify-center items-center md:mt-10">
      <Card className="md:w-1/2 w-full p-4">
        <Box className="flex md:flex-col justify-center items-center">
          <TextField
            value={todoValue.data}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            name="data"
            className="w-full"
            label="Add Todo"
            placeholder="Enter your todos"
          />
          <Button
            onClick={handleClick}
            variant="contained"
            className="m-2 md:w-1/3 md:text-2xl"
          >
            Add
          </Button>
        </Box>
        {todoStore.map((todo) => (
          <Box
            key={todo.id}
            className={`flex justify-between items-center ${
              todo.completed ? "bg-green-50" : "bg-gray-50"
            } rounded-3xl m-2 p-2`}
          >
            <Box className="flex items-center">
              <Checkbox
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <Box
                className={`${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.data}
              </Box>
            </Box>
            <Button
              onClick={() => handleRemoveTodo(todo.id)}
              color="error"
              className="rounded-3xl"
            >
              Remove
            </Button>
          </Box>
        ))}
      </Card>
    </Box>
  );
};

export default Todo;
