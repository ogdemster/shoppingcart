import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser2 } from "../redux/reducers/authCookieSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [login, setLogin] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevFormUser) => ({
      ...prevFormUser,
      [name]: value,
    }));
    setLogin(false);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser2(user)).then((result) => {
      if (result.payload === "User not found") {
        setLogin(true);
      } else {
        navigate("/");
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
            <Button
              variant="primary"
              type="submit"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
            {login && <Alert variant="danger">{error}</Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login2;
