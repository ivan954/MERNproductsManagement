import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <Navbar style={{ backgroundColor: "#102A41" }} variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Big-Store</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/create">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Craete-Products
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/manage">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Manage-Products
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Home
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
