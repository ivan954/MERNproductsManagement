import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createProduct } from "../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const CreateScreen = () => {
  const [name, setName] = useState("");
  const [catalogNumber, setCatalogNumber] = useState("");
  const [price, setPrise] = useState("");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [marketingData, setMarketingData] = useState();
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  const createProductHandler = () => {
    dispatch(
      createProduct(
        name,
        catalogNumber,
        price,
        description,
        productType,
        marketingData,
        image
      )
    );
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      alert("Product Created !");
      navigate("/manage");
    }
  }, [successCreate, navigate]);

  return (
    <Container>
      <FormContainer>
        <h1>Create Product</h1>

        {loadingCreate ? (
          <Loader />
        ) : (
          <Form onSubmit={createProductHandler}>
            <br />
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name ?? ""}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="catalogNumber">
              <Form.Label>Catalog Number</Form.Label>
              <Form.Control
                type="number"
                min={0}
                placeholder="Enter catalogNumber"
                value={catalogNumber ?? ""}
                onChange={(e) => setCatalogNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min={0}
                placeholder="Enter Price"
                value={price ?? ""}
                onChange={(e) => setPrise(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="price">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                type="text"
                placeholder="Enter description"
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="productType">
              <Form.Label>Product Type</Form.Label>
              <Form.Select
                placeholder="Enter description"
                aria-label="Default select example"
                value={productType ?? ""}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option hidden value>
                  Select product Type
                </option>
                <option value="vegetable">vegetable</option>
                <option value="fruit">fruit</option>
                <option value="Field Crops">Field Crops</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Form.Group controlId="marketingData">
              <Form.Label>Marketing Data</Form.Label>
              <Form.Control
                type="Date"
                onChange={(e) => {
                  const newDate = moment(new Date(e.target.value)).format(
                    "YYYY-MM-DD"
                  );
                  setMarketingData(newDate);
                }}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image ?? ""}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              {loadingCreate && <Loader />}
            </Form.Group>
            <br />
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            <Button className="me-5" type="submit" variant="primary">
              Create
            </Button>
            <Button
              onClick={() => {
                if (window.confirm("are you sure ? the Data will be lost")) {
                  navigate("/manage");
                }
              }}
              className="btn btn-dark my-3"
            >
              Cancel
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default CreateScreen;
