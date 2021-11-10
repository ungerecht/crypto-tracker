import React from "react";
import { Navbar, Nav, Container, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import GoogleAuth from "./GoogleAuth";
import GlobalInfo from "./GlobalInfo";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="py-3">
      <Container fluid="lg" className="d-flex justify-content-end">
        <GoogleAuth />
      </Container>
      <hr className="my-2" />
      <Navbar collapseOnSelect expand="sm">
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
            </Nav>
          </Navbar.Collapse>
          <Col className="justify-content-center mx-2 my-2 my-md-0">
            <SearchBar />
          </Col>
        </Container>
      </Navbar>
      <hr className="my-2" />
      <Container fluid="lg">
        <GlobalInfo />
      </Container>
      <hr className="my-2" />
    </div>
  );
};

export default Header;
