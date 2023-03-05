import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoppingItems } from "../redux/reducers/shoppingItemsSlice";

import { Table, Container, Row, Col } from "react-bootstrap";

function ShopHistoryDetail(props) {
  const dispatch = useDispatch();

  const { shoppingItems, loading, error } = useSelector(
    (state) => state.shoppingItems
  );
  const user = useSelector((state) => state.auth.user);
  const shoppingItemsByTrackId = shoppingItems.filter(
    (x) => x.shoppingtractid === parseInt(props.shoppingtractid)
  );
  useEffect(() => {
    if (user && user[0]) {
      dispatch(fetchShoppingItems({ user_id: user[0].id }));
    }
  }, [dispatch, user]);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Container fluid>
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
              {shoppingItemsByTrackId.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.item_title}</td>
                  <td>{item.quantity}</td>
                  <td>{USDollar.format(item.item_price)}</td>
                  <td>{USDollar.format(item.quantity * item.item_price)}</td>
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
    </Container>
  );
}

export default ShopHistoryDetail;
