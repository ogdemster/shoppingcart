import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navi() {
  const cartItems = useSelector((state) => state.cart.cartItems);

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
          </Nav>
          <Nav className="ml-auto">
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
