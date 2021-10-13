import React from "react";
import { Container, Table } from "react-bootstrap";
import "../styles/CryptoList.css";

class CryptoList extends React.Component {
  renderHead() {
    return (
      <thead>
        <tr>
          <th></th>
          <th>#</th>
          <th>Name</th>
          <th style={{ textAlign: "right" }}>Price</th>
          <th style={{ textAlign: "right" }}>24h %</th>
          <th style={{ textAlign: "right" }}>7d %</th>
          <th style={{ textAlign: "right" }}>Market Cap</th>
          <th style={{ textAlign: "right" }}>Volume(24 hours)</th>
          <th style={{ textAlign: "right" }}>Circulating Supply</th>
          <th style={{ textAlign: "right" }}>Last 7 Days</th>
          <th></th>
        </tr>
      </thead>
    );
  }

  renderBody() {
    return <tbody></tbody>;
  }

  render() {
    return (
      <Container className="pt-5">
        <Table striped hover>
          {this.renderHead()}
          {this.renderBody()}
        </Table>
      </Container>
    );
  }
}

export default CryptoList;
