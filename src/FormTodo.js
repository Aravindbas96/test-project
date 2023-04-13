import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const FormTodo = ({ addTodo }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>
          <b>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Todo"
        />
      </Form.Group>
      <br />
      <Button type="Submit">Submit</Button>
    </Form>
  );
};

export default FormTodo;
