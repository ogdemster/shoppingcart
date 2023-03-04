import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoppingTracks } from "../redux/reducers/shoppingTracksSlice";

import { Table, Container, Row, Col } from "react-bootstrap";

function ShopHistory() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { shoopingTracks, loading, error } = useSelector(
    (state) => state.shoopingTracks
  );

  //   console.log(user[0].id);
  useEffect(() => {
    if (!user) {
      // check if user is empty
      return; // return early
    }
    dispatch(fetchShoppingTracks({ user_id: user[0].id }));
  }, [dispatch, user]);

  if (!user) {
    return null; // or you can return an empty component, e.g., <></>
  }
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <Container>
      <Row className="ml-auto justify-content-end">
        <Col xs={4}>
          <h5>Toplam Fiyat: </h5>
          {/* {USDollar.format(cartTotal)} */}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shoopingTracks &&
                shoopingTracks.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.total_price}</td>
                    {/* <td>{USDollar.format(item.price)}</td>
                <td>{USDollar.format(item.quantity * item.price)}</td> */}
                    <td>
                      {/* <Button onClick={() => handleRemove(item)}>
                    Remove From Cart
                  </Button> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* <Row className="ml-auto justify-content-end">
      <Col xs={1}>
        <Button onClick={() => handleClearCart()}>Clear Cart</Button>
      </Col>
      <Col xs={1}>
        <Button onClick={() => handleSaveCart()}>Save Cart</Button>
      </Col>
    </Row> */}
    </Container>
  );
}

export default ShopHistory;
