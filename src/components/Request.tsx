//import React from 'react'
import { Card, Form, FloatingLabel } from "react-bootstrap";

const Request = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Request Form</Card.Title>
        <Card.Text>
          <Form>
            <FloatingLabel controlId="reqEmail" label="Email Address">
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <Form.Group>
              <Form.Check />
            </Form.Group>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Request;
