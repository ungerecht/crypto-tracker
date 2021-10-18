import React from "react";
import { connect } from "react-redux";
import { fetchMarket } from "../actions";
import PaginationBar from "./PaginationBar";
import { Container, Table, Col, Row } from "react-bootstrap";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { starIcon } from "../icons";
import "../styles/CryptoList.css";

class CryptoList extends React.Component {
  componentDidMount() {
    this.props.fetchMarket(this.props.active);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this.props.fetchMarket(this.props.active);
    }
  }

  renderHead() {
    return (
      <thead className="sticky-top">
        <tr>
          <th></th>
          <th style={{ textAlign: "center" }}>#</th>
          <th>Coin</th>
          <th style={{ textAlign: "right" }}>Price</th>
          <th style={{ textAlign: "right" }}>24h</th>
          <th style={{ textAlign: "right" }}>7d</th>
          <th style={{ textAlign: "right" }}>Market Cap</th>
          <th style={{ textAlign: "right" }}>Circulating Supply</th>
          <th style={{ textAlign: "center" }}>Last 7 Days</th>
        </tr>
      </thead>
    );
  }

  renderBody() {
    return (
      <tbody>
        {this.props.coins.map((coin) => {
          return (
            <tr key={coin.id} height={68}>
              <td>{starIcon}</td>
              <td className="center">{coin.market_cap_rank}</td>
              <td>
                <Row>
                  <Col xs="auto">
                    <img
                      src={coin.image}
                      width="20px"
                      className="center"
                      alt={coin.name + " icon"}
                    />
                  </Col>
                  <Col xs={6}>
                    <strong>{coin.name}</strong>
                  </Col>
                  <Col xs="auto">
                    <small className="text-muted">{coin.symbol}</small>
                  </Col>
                </Row>
              </td>
              <td className="right">{coin.current_price}</td>
              <td
                className="right"
                style={{
                  color:
                    coin.price_change_percentage_24h >= 0 ? "limegreen" : "red",
                }}
              >
                {coin.price_change_percentage_24h}%
              </td>
              <td
                className="right"
                style={{
                  color:
                    coin.price_change_percentage_7d_in_currency >= 0
                      ? "limegreen"
                      : "red",
                }}
              >
                {coin.price_change_percentage_7d_in_currency}%
              </td>
              <td className="right">{coin.market_cap}</td>
              <td className="right">{`${coin.circulating_supply} ${coin.symbol}`}</td>
              <td className="chart">
                <Sparklines
                  data={coin.sparkline_in_7d.price}
                  svgHeight={50}
                  svgWidth={135}
                >
                  <SparklinesLine
                    color={
                      coin.sparkline_in_7d.price[0] <=
                      coin.sparkline_in_7d.price[
                        coin.sparkline_in_7d.price.length - 1
                      ]
                        ? "limegreen"
                        : "red"
                    }
                    style={{ fill: "none" }}
                  />
                </Sparklines>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    return (
      <Container className="pt-5">
        <Table hover>
          {this.renderHead()}
          {this.renderBody()}
        </Table>
        <Row className="justify-content-center">
          <Col md="auto">
            <PaginationBar
              page={
                this.props.match.params.page
                  ? parseInt(this.props.match.params.page, 10)
                  : 1
              }
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { active: state.page.active, coins: state.page.coins };
};

export default connect(mapStateToProps, { fetchMarket })(CryptoList);
