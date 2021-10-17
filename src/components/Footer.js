import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="py-4">
        <Container>
          <Navbar.Brand className="mx-auto">
            Crypto Tracker
            <br />
            <Navbar.Text>
              <small>© 2021 Kevin Ungerecht</small>
            </Navbar.Text>
          </Navbar.Brand>
          <Nav className="flex-column mx-auto">
            <Nav.Link>About</Nav.Link>
            <Nav.Link>Github</Nav.Link>
            <Nav.Link>Developer</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
