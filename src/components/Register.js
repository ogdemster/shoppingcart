import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import alertify from "alertifyjs";

import { useDispatch } from "react-redux";
import { addUser } from "../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const [alertText, setAlertText] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevFormUser) => ({
      ...prevFormUser,
      [name]: value,
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    if (!user.username || !user.password || !user.password2) {
      setAlertText("Please fill in all fields");
      return;
    }
    if (user.password !== user.password2) {
      setAlertText("Passwords do not match");
      return;
    }
    dispatch(addUser(user)).then((result) => {
      console.log(result.payload.isNewUser);
      if (result.payload.isNewUser) {
        alertify.success("Successfully registered");
        navigate("/login");
      } else {
        alertify.error("User already exists");
      }
    });
  };

  return (
    <Container>
      <Row
        className="ml-auto justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Col xs={4}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="test"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
                name="username"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Password Again</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password2"
                value={user.password2}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleRegister}>
              Register
            </Button>
            {alertText !== null && <Alert variant="danger">{alertText}</Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
