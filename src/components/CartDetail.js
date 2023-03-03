import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import {
  removeFromCart,
  clearCart,
  saveCart,
} from "../redux/reducers/cartSlice";
import { useNavigate } from "react-router-dom";

function CartDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useSelector((state) => state.cart);

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

  const handleSaveCart = async () => {
    await dispatch(saveCart(cartItems));
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
          <Button onClick={() => handleSaveCart()}>Save Cart</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CartDetail;
