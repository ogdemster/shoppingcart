import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../redux/reducers/productSlice";
import alertify from "alertifyjs";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { products } = useSelector((state) => state.products);
  let product = {};
  if (id > 0) {
    product = products.find((product) => product.id === parseInt(id)) || {};
  }

  const [formProduct, setFormProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: "",
  });

  useEffect(() => {
    setFormProduct({
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      discountPercentage: product.discountPercentage || "",
      rating: product.rating || "",
      stock: product.stock || "",
      brand: product.brand || "",
      category: product.category || "",
      thumbnail: product.thumbnail || "",
      images: product.images || "",
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormProduct((prevFormProduct) => ({
      ...prevFormProduct,
      [name]: value,
    }));
  };

  const handleConfirmation = (title, message, onConfirm, onCancel) => {
    alertify.confirm(title, message, onConfirm, onCancel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (product.id > 0) {
      handleConfirmation(
        "Update Product",
        "Do you want to update?",
        async function () {
          dispatch(updateProduct({ id, ...formProduct }));
          navigate("/");
          alertify.success("Successfully updated");
        },
        function () {
          alertify.error("Cancel");
        }
      );
    } else {
      handleConfirmation(
        "Add Product",
        "Do you want to add?",
        async function () {
          dispatch(addProduct(formProduct));
          navigate("/");
          alertify.success("Successfully added");
        },
        function () {
          alertify.error("Cancel");
        }
      );
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (product.id) {
      handleConfirmation(
        "Delete Product",
        "Do you want to delete?",
        async function () {
          dispatch(deleteProduct(id));
          navigate("/");
          alertify.success("Successfully deleted");
        },
        function () {
          alertify.error("Cancel");
        }
      );
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
      <Form.Group className="mb-3" controlId="formBasicprice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          value={formProduct.price}
          onChange={handleChange}
          name="price"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicdiscountPercentage">
        <Form.Label>discountPercentage</Form.Label>
        <Form.Control
          type="text"
          placeholder="discountPercentage"
          value={formProduct.discountPercentage}
          onChange={handleChange}
          name="discountPercentage"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicrating">
        <Form.Label>rating</Form.Label>
        <Form.Control
          type="text"
          placeholder="rating"
          value={formProduct.rating}
          onChange={handleChange}
          name="rating"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicstock">
        <Form.Label>sTOCK</Form.Label>
        <Form.Control
          type="text"
          placeholder="stock"
          value={formProduct.stock}
          onChange={handleChange}
          name="stock"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicbrand">
        <Form.Label>brand</Form.Label>
        <Form.Control
          type="text"
          placeholder="brand"
          value={formProduct.brand}
          onChange={handleChange}
          name="brand"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasiccategory">
        <Form.Label>category</Form.Label>
        <Form.Control
          type="text"
          placeholder="category"
          value={formProduct.category}
          onChange={handleChange}
          name="category"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicthumbnail">
        <Form.Label>thumbnail</Form.Label>
        <Form.Control
          type="text"
          placeholder="thumbnail"
          value={formProduct.thumbnail}
          onChange={handleChange}
          name="thumbnail"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicimages">
        <Form.Label>images</Form.Label>
        <Form.Control
          type="text"
          placeholder="images"
          value={formProduct.images}
          onChange={handleChange}
          name="images"
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button onClick={handleDelete}>Delete Product</Button>
    </Form>
  );
}

export default ProductDetails;
