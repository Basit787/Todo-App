import { Box, Button, Card, Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";
import useTodoStore from "./stores/TodoStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Todo = () => {
  const { todoStore, addTodo, removeTodo, completeTodo, updateTodo } =
    useTodoStore((state) => state);

  const [todoValue, setTodoValue] = useState({
    id: "",
    data: "",
    completed: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditindex] = useState(null);

  const handleChange = (e) => {
    setTodoValue((prv) => ({
      ...prv,
      data: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (todoValue.data !== "") {
      if (isEditing) {
        updateTodo({ ...todoValue });
        setIsEditing(false);
      } else {
        addTodo({
          ...todoValue,
          id: Math.floor(Math.random() * 1000),
          completed: false,
        });
      }

      setTodoValue({
        id: "",
        data: "",
        completed: false,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleRemoveTodo = (id) => {
    removeTodo(id);
    if (isEditing && todoValue.id === id) {
      setIsEditing(false);
      setTodoValue({ id: "", data: "", completed: false });
    }
  };

  const handleCheckboxChange = (id) => {
    completeTodo(id);
  };

  const handleEditTodo = (todo, index) => {
    setTodoValue({ ...todo });
    setIsEditing(true);
    setEditindex(index);
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
            label={isEditing ? `Edit Todo ${editIndex}` : "Add Todo"}
            placeholder="Enter your todos"
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="m-2 md:w-1/3 md:text-2xl"
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </Box>
        {todoStore.map((todo, index) => (
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
                className={`${todo.completed && "line-through text-gray-400"} `}
              >
                {todo.data}
              </Box>
            </Box>
            <Box className="flex md:flex-row flex-col ">
              <Button
                onClick={() => handleEditTodo(todo, index + 1)}
                className="rounded-3xl text-green-700"
                disabled={todo.completed}
              >
                <EditIcon />
              </Button>
              <Button
                onClick={() => handleRemoveTodo(todo.id)}
                color="error"
                className="rounded-3xl"
              >
                <DeleteIcon />
              </Button>
            </Box>
          </Box>
        ))}
      </Card>
    </Box>
  );
};

export default Todo;
