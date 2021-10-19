import React from "react";
import { Container } from "react-bootstrap";
import "../styles/Footer.css";
import { githubIcon } from "../icons";

const Footer = () => {
  return (
    <div className="bg-dark py-4">
      <Container fluid="lg">
        <div className="d-flex justify-content-center">
          <div className="align-items-center footer me-5">
            <h5 className="text-white">Crypto Tracker</h5>
            <span className="text-white text-muted">
              Data provided by&nbsp;
              <a
                href="https://www.coingecko.com/en/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none"
              >
                CoinGecko API
              </a>
            </span>
            <br />
            <span className="text-white text-muted">
              Developed by&nbsp;
              <a
                href="https://www.ungerecht.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none"
              >
                Kevin Ungerecht
              </a>
            </span>
          </div>
          <div width={135} className="d-flex align-items-center ">
            <a
              href="https://github.com/ungerecht/crypto-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none"
            >
              {githubIcon}
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
