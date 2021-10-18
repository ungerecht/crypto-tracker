import React from "react";
import { connect } from "react-redux";
import { fetchMarket, setActive } from "../actions";
import PaginationBar from "./PaginationBar";
import { Container, Table, Col, Row } from "react-bootstrap";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { starIcon } from "../icons";
import "../styles/CryptoList.css";

class CryptoList extends React.Component {
  componentDidMount() {
    if (this.props.match.params.page) {
      //url page exists
      const page = parseInt(this.props.match.params.page, 10);
      if (page !== this.props.active) {
        //url page is not active
        this.props.setActive(page);
        this.props.fetchMarket(page);
      } else {
        //url page exists and is active
        this.props.fetchMarket(this.props.active);
      }
    } else {
      //home page
      this.props.fetchMarket(this.props.active);
    }
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
          <th className="text-center">#</th>
          <th>Coin</th>
          <th className="text-end">Price</th>
          <th className="text-end">24h</th>
          <th className="text-end">7d</th>
          <th className="text-end">Market Cap</th>
          <th className="text-end">Circulating Supply</th>
          <th className="text-center">Last 7 Days</th>
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
              <td width={20} className="pe-0">
                <div className="d-flex align-items-center justify-content-center">
                  {starIcon}
                </div>
              </td>
              <td width={47} className="text-center">
                {coin.market_cap_rank}
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={coin.image}
                    width="20px"
                    alt={coin.name + " icon"}
                    className="me-3"
                  />
                  <strong className="col-4">{coin.name}</strong>
                  <small>{coin.symbol}</small>
                </div>
              </td>
              <td className="text-end" width={120}>
                {coin.current_price}
              </td>
              <td
                className="right"
                style={{
                  color:
                    coin.price_change_percentage_24h >= 0 ? "limegreen" : "red",
                }}
                width={70}
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
                width={70}
              >
                {coin.price_change_percentage_7d_in_currency}%
              </td>
              <td className="text-end" width={155}>
                {coin.market_cap}
              </td>
              <td className="text-end" width={200}>
                <span>{coin.circulating_supply}</span>
                <small className="text-muted ms-1">{coin.symbol}</small>
              </td>
              <td width={135}>
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
            <PaginationBar />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { active: state.page.active, coins: state.page.coins };
};

export default connect(mapStateToProps, { fetchMarket, setActive })(CryptoList);
