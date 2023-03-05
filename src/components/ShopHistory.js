import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchShoppingTracks } from "../redux/reducers/shoppingTracksSlice";
import ShopHistoryDetail from "./ShopHistoryDetail";
import { Container, Row, Accordion, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function ShopHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { shoopingTracks, loading, error } = useSelector(
    (state) => state.shoopingTracks
  );
  useEffect(() => {
    if (user && user[0]) {
      dispatch(fetchShoppingTracks({ user_id: user[0].id }));
    } else {
      navigate("/login");
    }
  }, [dispatch, user, navigate]);

  if (!user) {
    return null; // or you can return an empty component, e.g., <></>
  }
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  if (shoopingTracks.length === 0) {
    return (
      <Container>
        <Row
          className="ml-auto justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Col xs={6} className="text-center">
            <Alert key={1} variant="secondary">
              Sad!!! You never go shopping with us!!!
              <br />
              <Link to="/" style={{ color: "blue" }}>
                Start Shopping
              </Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
    // return <div>Sad!!! You never go shopping with us!!!</div>;
  }

  return (
    <Container>
      <Row>
        <Accordion defaultActiveKey="0" flush>
          {shoopingTracks &&
            shoopingTracks.map((item, index) => (
              <Accordion.Item eventKey={index} key={item.id + index}>
                <Accordion.Header>
                  {item.date + ": " + item.total_price}
                </Accordion.Header>
                <Accordion.Body>
                  <ShopHistoryDetail shoppingtractid={item.id} />
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      </Row>
    </Container>
  );
}

export default ShopHistory;
