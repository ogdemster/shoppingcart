import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
function Navi() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Basic Shopping Cart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/productdetails" className="nav-link">
              New Product
            </Link>
          </Nav>

          {user.length > 0 ? (
            <Logout usr={user} />
          ) : (
            <>
              <Link to="/login" className="nav-link" style={{ width: "80px" }}>
                Login
              </Link>
              <Link
                to="/register"
                className="nav-link"
                style={{ width: "80px" }}
              >
                Register
              </Link>
            </>
          )}
          <Nav
            className="ml-auto justify-content-center"
            style={{ width: "100px" }}
          >
            {cartItems.length < 1 ? (
              <Nav.Link href="#" disabled>
                <FaShoppingBag />
              </Nav.Link>
            ) : (
              <Link to="/cartdetail" className="nav-link">
                <FaShoppingBag style={{ color: "orange" }} />
                <Badge bg="secondary">{cartItems.length}</Badge>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navi;
