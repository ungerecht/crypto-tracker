import React from "react";
import { Navbar, Nav, Container, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import GoogleAuth from "./GoogleAuth";
import GlobalInfo from "./GlobalInfo";
import ThemeButton from "./ThemeButton";
import "../styles/Header.css";

const Header = () => {
  return (
    <div>
      <Container
        fluid="lg"
        className="d-flex justify-content-end py-3"
        style={{ height: "64px" }}
      >
        <GoogleAuth />
        <ThemeButton />
      </Container>
      <hr className="my-0" />
      <Navbar className="py-0">
        <Container fluid="lg" className="flex-wrap py-3 align-items-center">
          <Navbar.Brand className="me-4 pt-0 pb-1 fw-bold" href="/">
            CryptoTracker
          </Navbar.Brand>
          <Nav className="d-flex flex-grow-1 py-0 justify-content-center justify-content-sm-start">
            <Nav.Link className="fw-bold p-0 me-4" href="/">
              Coins
            </Nav.Link>
            <Nav.Link className="fw-bold p-0 me-4">Exchanges</Nav.Link>
            <Nav.Link className="fw-bold p-0">Watchlist</Nav.Link>
          </Nav>
          <Col>
            <SearchBar />
          </Col>
        </Container>
      </Navbar>
      <hr className="my-0" />
      <Container fluid="lg">
        <GlobalInfo />
      </Container>
      <hr className="my-0" />
    </div>
  );
};

export default Header;
