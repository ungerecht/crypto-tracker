import React from "react";
import { Navbar, Nav, Container, Col } from "react-bootstrap";
import GoogleAuth from "./GoogleAuth";
import SearchBar from "./SearchBar";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="bg-dark py-3">
      <Container fluid="lg" className="d-flex justify-content-end">
        <GoogleAuth className="" />
      </Container>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container fluid="lg" className="flex-wrap">
          <Navbar.Brand className="me-4" href="/">
            Crypto Tracker
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="ms-5 my-2"
          />
          <Navbar.Collapse className="mx-2">
            <Nav>
              <Nav.Link href="/">Cryptocurrencies</Nav.Link>
              <Nav.Link>Exchanges</Nav.Link>
              <Nav.Link>Watchlist</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Col className="justify-content-center mx-2 my-2 my-md-0">
            <SearchBar />
          </Col>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
