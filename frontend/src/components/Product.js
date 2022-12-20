import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { deleteProduct } from "../actions/productActions";
import Pagination from "./Pagination";

const Product = ({ searchTerm }) => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPost] = useState(products);

  const [postsPerPage] = useState(4); //   <---- products per page

  // Get current posts and last post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteHandler = (id) => {
    if (window.confirm("are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  //will searching set page to 1
  useEffect(() => {
    setSearchText(searchTerm);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  return (
    <>
      {currentPost
        .filter((val) => {
          if (searchText === "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return val;
          }
        })
        .slice(indexOfFirstPost, indexOfLastPost)
        .map((product) => (
          <Col key={product._id} md={6}>
            <Card className="my-3 p-3 text-center rounded">
              <Card.Title>
                <p>{product.name}</p>
              </Card.Title>
              <Link to={`/product/${product._id}`}>
                <Card.Img height={300} src={product.image} variant="top" />
              </Link>
              <Card.Body>
                <Card.Text as="h5">
                  Marketing Data:
                  {moment(new Date(product.marketingData)).format("DD/MM/YYYY")}
                </Card.Text>

                <Card.Text as="h5">Price: {product.price}$</Card.Text>
              </Card.Body>
              <Button
                style={{ backgroundColor: "#102A41" }}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                Details and update
              </Button>

              <Button
                variant="danger"
                className="mt-1"
                onClick={() => deleteHandler(product._id)}
              >
                DELETE
              </Button>
            </Card>
          </Col>
        ))}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={products.length}
        paginate={paginate}
      />
    </>
  );
};

export default Product;
