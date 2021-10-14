import React from "react";
import coingecko from "../apis/coingecko";
import { Container, Table, Col, Row } from "react-bootstrap";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { formatCurrency } from "@coingecko/cryptoformat";
import "../styles/CryptoList.css";

class CryptoList extends React.Component {
  state = { coins: [] };

  star = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-star"
      viewBox="0 0 20 20"
    >
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
    </svg>
  );

  componentDidMount() {
    this.getCoins();
  }

  getCoins = async () => {
    const response = await coingecko.get("/coins/markets/");
    this.setState({ coins: response.data });
    console.log(response.data);
  };

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
    return this.state.coins.map((coin) => {
      return (
        <tr>
          <td>{this.star}</td>
          <td style={{ textAlign: "center" }}>{coin.market_cap_rank}</td>
          <td>
            <Row>
              <Col xs="auto">
                <img src={coin.image} height="20px" className="center" />
              </Col>
              <Col xs={6}>
                <strong>{coin.name}</strong>
              </Col>
              <Col xs="auto">
                <small className="text-muted">
                  {coin.symbol.toUpperCase()}
                </small>
              </Col>
            </Row>
          </td>
          <td style={{ textAlign: "right" }}>
            {formatCurrency(coin.current_price, "USD", "en")}
          </td>
          <td
            style={{
              textAlign: "right",
              color: coin.price_change_percentage_24h >= 0 ? "green" : "red",
            }}
          >
            {coin.price_change_percentage_24h.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
            %
          </td>
          <td
            style={{
              textAlign: "right",
              color:
                coin.price_change_percentage_7d_in_currency >= 0
                  ? "green"
                  : "red",
            }}
          >
            {coin.price_change_percentage_7d_in_currency.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
              }
            )}
            %
          </td>
          <td style={{ textAlign: "right" }}>
            {formatCurrency(coin.market_cap, "USD", "en", false, true)}
          </td>
          <td
            style={{ textAlign: "right" }}
          >{`${coin.circulating_supply.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })} ${coin.symbol.toUpperCase()}`}</td>
          <td className="text-center" style={{ width: "135px" }}>
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
                    ? "green"
                    : "red"
                }
                style={{ fill: "none" }}
              />
            </Sparklines>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Container className="pt-5">
        <Table>
          {this.renderHead()}
          <tbody>{this.renderBody()}</tbody>
        </Table>
      </Container>
    );
  }
}

export default CryptoList;
