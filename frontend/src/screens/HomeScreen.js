import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Container } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container className="text-center">
          <h1>Welcome to BIG-STORE</h1>
          <ImageCarousel products={products} />
        </Container>
      )}
    </Container>
  );
};

export default HomeScreen;
