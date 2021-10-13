import React from "react";
import { Navbar, Nav, Container, Col } from "react-bootstrap";
import GoogleAuth from "./GoogleAuth.js";
import SearchBar from "./SearchBar.js";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="py-4">
        <Container>
          <Navbar.Brand href="/">Crypto Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>Cryptocurrencies</Nav.Link>
            <Nav.Link>Watchlist</Nav.Link>
            <Nav.Link>About</Nav.Link>
          </Nav>
          <Col className="mx-4">
            <SearchBar />
          </Col>
          <GoogleAuth />
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
