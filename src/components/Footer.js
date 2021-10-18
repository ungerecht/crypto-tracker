import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "../styles/Footer.css";
import { githubIcon } from "../icons";

const Footer = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="py-4">
        <Container className="justify-content-center">
          <Navbar.Brand>
            Crypto Tracker
            <br />
            <Navbar.Text>
              Data provided by&nbsp;
              <a
                href="https://www.coingecko.com/en/api"
                target="_blank"
                rel="noopener noreferrer"
              >
                CoinGecko API
              </a>
            </Navbar.Text>
            <br />
            <Navbar.Text>© 2021 Kevin Ungerecht</Navbar.Text>
          </Navbar.Brand>
          <Nav>
            <Nav.Link
              className="my-auto"
              href="https://github.com/ungerecht/crypto-tracker"
              target="_blank"
              rel="noopener noreferrer"
            >
              {githubIcon}
            </Nav.Link>
            <Nav.Link
              className="my-auto"
              href="https://ungerecht.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Developer
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
