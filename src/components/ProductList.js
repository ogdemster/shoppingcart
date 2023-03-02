import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/reducers/productSlice";
import { addToCart } from "../redux/reducers/cartSlice";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    <div>Loading</div>;
  }
  if (error) {
    <div>Error</div>;
  }

  const handleBuy = (product) => {
    dispatch(addToCart(product));
  };

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //   const formatPrice = (price) =>
  //     new ("en-US",
  //     {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(price);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              <Link to={`/productdetails/${product.id}`}> {product.title}</Link>
            </td>
            <td>{USDollar.format(product.price)}</td>
            <td>
              <Button onClick={() => handleBuy(product)}>Buy me</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductList;
