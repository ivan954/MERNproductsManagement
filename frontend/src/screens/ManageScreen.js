import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, InputGroup, FormControl } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const ManageScreen = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productList = useSelector((state) => state.productList);
  const { loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <h1>Products List</h1>
        </Col>
        <Col sm={8}>
          <InputGroup
            className="mb-2
          "
          >
            <FormControl
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type="text"
              placeholder="Search..."
              className="w-100 text-center border border-dark"
            />
          </InputGroup>
        </Col>
      </Row>
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingDelete ? (
        <Loader />
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Product searchTerm={searchTerm} />
        </Row>
      )}
    </Container>
  );
};

export default ManageScreen;
