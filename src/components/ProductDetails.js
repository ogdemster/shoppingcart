import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../redux/reducers/productSlice";

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { products } = useSelector((state) => state.products);
  const product = products.find((product) => product.id === parseInt(id)) || {};

  const [formProduct, setFormProduct] = useState({
    title: product.title || "",
    description: product.description || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormProduct((prevFormProduct) => ({
      ...prevFormProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (product.id) {
      dispatch(updateProduct({ id: product.id, ...formProduct }));
    } else {
      dispatch(addProduct(formProduct));
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (product.id) {
      dispatch(deleteProduct(product.id));
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          value={formProduct.title}
          onChange={handleChange}
          name="title"
        />
        <Form.Text className="text-muted">
          Dont change this until you are sure madafaka
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Description"
          value={formProduct.description}
          onChange={handleChange}
          name="description"
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={() => handleSubmit}>
        Submit
      </Button>
      <Button onClick={() => handleDelete}>Delete Product</Button>
    </Form>
  );
}

export default ProductDetails;
