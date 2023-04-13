import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const getTodos = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  return storedTodos ? storedTodos : [];
};

const App = () => {
  const [todos, setTodos] = useState(getTodos());
  const [newTodo, setNewTodo] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const updatedTodos = [...todos, { text: newTodo, isDone: false }];
    setTodos(updatedTodos);
    setNewTodo("");
  };

  const markTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isDone = !updatedTodos[index].isDone;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const updateTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const updatedTodos = [...todos];
    updatedTodos[updateIndex].text = newTodo;
    setTodos(updatedTodos);
    setNewTodo("");
    setUpdateIndex(null);
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <h1 className="text-center mb-4">Todo List</h1>
          <Form onSubmit={updateIndex === null ? addTodo : updateTodo}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {updateIndex === null ? "Add Todo" : "Update Todo"}
            </Button>
            {updateIndex !== null && (
              <Button
                variant="secondary"
                className="mx-2"
                onClick={() => {
                  setNewTodo("");
                  setUpdateIndex(null);
                }}
              >
                Cancel
              </Button>
            )}
          </Form>
          <br />
          <div className="todos">
            {todos.map((todo, index) => (
              <Card key={index}>
                <Card.Body>
                  <div className="todo">
                    <span
                      style={{
                        textDecoration: todo.isDone ? "line-through" : "",
                      }}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div className="todo_buttons">
                    <Button
                      variant={todo.isDone ? "secondary" : "success"}
                      onClick={() => markTodo(index)}
                      className="mx-2"
                    >
                      {todo.isDone ? "Undone" : "Done"}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setNewTodo(todo.text);
                        setUpdateIndex(index);
                      }}
                      className="mx-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteTodo(index)}
                      className="mx-2"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
