import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import {
  removeFromCart,
  clearCart,
  saveCart,
} from "../redux/reducers/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import alertify from "alertifyjs";

function CartDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (cartItems.length < 1) {
      navigate("/");
    }
  });

  const handleRemove = (item) => {
    dispatch(removeFromCart({ id: item.id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleSaveCart = () => {
    alertify.confirm(
      "Complate Shopping",
      "Do you want to buy this products",
      async function () {
        await dispatch(saveCart({ cartItems: cartItems, userId: user[0].id }));
        dispatch(clearCart());
        alertify.success("Ok");
      },
      function () {
        alertify.error("Cancel");
      }
    );
  };

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Container>
      <Row className="ml-auto justify-content-end">
        <Col xs={4}>
          <h5>Toplam Fiyat: </h5>
          {USDollar.format(cartTotal)}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Per Price</th>
                <th>SubTotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{USDollar.format(item.price)}</td>
                  <td>{USDollar.format(item.quantity * item.price)}</td>
                  <td>
                    <Button onClick={() => handleRemove(item)}>
                      Remove From Cart
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="ml-auto justify-content-end">
        <Col xs={1}>
          <Button onClick={() => handleClearCart()}>Clear Cart</Button>
        </Col>
        <Col xs={1}>
          {user && user[0] ? (
            <Button onClick={() => handleSaveCart()}>Save Cart</Button>
          ) : (
            <Link to="/login">Login First</Link>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CartDetail;
