import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Todo.css";

const Todo = ({ todo, index, markTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = () => {
    editTodo(index, updatedText);
    setIsEditing(false);
  };

  return (
    <>
    <div className="todo">
      {!isEditing && (
        <>
          <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
            {todo.text}
          </span>
          <div className="todo_button">
            <Button onClick={() => markTodo(index)}>
              {todo.isDone ? "Not Done" : "Done"}
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => deleteTodo(index)}>
              Delete
            </Button>
          </div>
        </>
      )}
      {isEditing && (
        <>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <div className="todo_button">
            <Button variant="success" onClick={handleUpdate}>
              Edit
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Todo;
