import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPage, setActive } from "../actions";
import PaginationBar from "./PaginationBar";
import { Container, Table } from "react-bootstrap";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { starIcon } from "../icons";
import { formatPercentage, formatSupply } from "../helpers";
import { formatCurrency } from "@coingecko/cryptoformat";
import "../styles/CryptoList.css";

class CryptoList extends React.Component {
  componentDidMount() {
    if (this.props.match.params.page) {
      //url page exists
      const page = parseInt(this.props.match.params.page, 10);
      if (page !== this.props.active) {
        //url page is not active
        this.props.setActive(page);
        this.props.fetchPage(page);
      } else {
        //url page exists and is active
        this.props.fetchPage(this.props.active);
      }
    } else {
      //home page
      this.props.fetchPage(this.props.active);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this.props.fetchPage(this.props.active);
    }
  }

  renderHead() {
    return (
      <thead className="sticky-top">
        <tr>
          <th width={32}></th>
          <th width={39} className="text-center">
            #
          </th>
          <th>Coin</th>
          <th width={95} className="text-end px-3">
            Price
          </th>
          <th width={61} className="text-end px-3">
            24h
          </th>
          <th width={61} className="text-end px-3">
            7d
          </th>
          <th width={134} className="text-end px-3">
            Market Cap
          </th>
          <th width={171} className="text-end px-3">
            Circulating Supply
          </th>
          <th className="text-center">Last 7 Days</th>
        </tr>
      </thead>
    );
  }

  renderBody() {
    return (
      <tbody>
        {this.props.page.map((coin) => {
          return (
            <tr key={coin.id} height={68}>
              <td>
                <div className="d-flex align-items-center justify-content-center">
                  {starIcon}
                </div>
              </td>
              <td className="text-center">{coin.market_cap_rank}</td>
              <td>
                <Link
                  to={`/coin/${coin.id}`}
                  className="text-decoration-none text-black"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={coin.image}
                      width="20px"
                      alt={coin.name + " icon"}
                      className="me-3"
                    />
                    <strong className="col-3 me-5">{coin.name}</strong>
                    <small className="col-1 ms-2">
                      {coin.symbol.toUpperCase()}
                    </small>
                  </div>
                </Link>
              </td>
              <td className="text-end px-3">
                {formatCurrency(coin.current_price, "USD", "en")}
              </td>
              <td
                className="text-end px-3"
                style={{
                  color:
                    coin.price_change_percentage_24h >= 0 ? "limegreen" : "red",
                }}
              >
                {formatPercentage(coin.price_change_percentage_24h)}
              </td>
              <td
                className="text-end px-3"
                style={{
                  color:
                    coin.price_change_percentage_7d_in_currency >= 0
                      ? "limegreen"
                      : "red",
                }}
              >
                {formatPercentage(coin.price_change_percentage_7d_in_currency)}
              </td>
              <td className="text-end px-3">
                {formatCurrency(coin.market_cap, "USD", "en")}
              </td>
              <td className="text-end px-3">
                <span>{formatSupply(coin.circulating_supply)}</span>
                <small className="text-muted ms-1">
                  {coin.symbol.toUpperCase()}
                </small>
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
      <Container className="pt-5" fluid="xl">
        <Table responsive="xl" hover>
          {this.renderHead()}
          {this.renderBody()}
        </Table>
        <PaginationBar />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { active: state.page.active, page: state.page.page };
};

export default connect(mapStateToProps, { fetchPage, setActive })(CryptoList);
