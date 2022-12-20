import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  deleteProduct,
  listProductDetails,
  updateProduct,
} from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const UpdateScreen = () => {
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id } = useParams();

  const productDetalis = useSelector((state) => state.productDetalis);
  const { loading, error, product } = productDetalis;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const [name, setName] = useState("");
  const [catalogNumber, setCatalogNumber] = useState("");
  const [price, setPrise] = useState("");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [marketingData, setMarketingData] = useState(Date());
  const [image, setImage] = useState("");

  const deleteHandler = (id) => {
    if (window.confirm("are you sure")) {
      dispatch(deleteProduct(id));
      navigate("/manage");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        catalogNumber,
        productType,
        description,
        marketingData,
      })
    );
  };
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/manage");
    } else {
      if (!product || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrise(product.price);
        setImage(product.image);
        setCatalogNumber(product.catalogNumber);
        setProductType(product.productType);
        setMarketingData(product.marketingData);
        setDescription(product.description);
      }
    }
  }, [dispatch, id, navigate, product, successUpdate]);

  return (
    <Container>
      <Link to="/manage" className="btn btn-dark my-3">
        go back
      </Link>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="ID">
              <Form.Control
                type="name"
                disabled
                value={"ID : " + id ?? ""}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
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
                min={0}
                type="number"
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
                pattern="^\d{0,14}\.\d{0,6}$"
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
                aria-label="Default select example"
                value={productType ?? ""}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option>{productType}</option>
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
                value={
                  moment(new Date(marketingData)).format("YYYY-MM-DD") ?? ""
                }
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

              {uploading && <Loader />}
            </Form.Group>
            <br />
            <div>
              <Button className="me-5" type="submit" variant="primary">
                Update
              </Button>

              <Button
                variant="danger"
                onClick={() => deleteHandler(product._id)}
              >
                DELETE
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default UpdateScreen;
