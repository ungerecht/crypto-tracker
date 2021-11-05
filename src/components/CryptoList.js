import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPage, setActive } from "../actions";
import PaginationBar from "./PaginationBar";
import { Container, Table, Placeholder } from "react-bootstrap";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { formatPercentage, formatSupply } from "../helpers";
import { formatCurrency } from "@coingecko/cryptoformat";
import "../styles/CryptoList.css";

const CryptoList = (props) => {
  const { page, active } = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const pageId = props.match.params.page;

  useEffect(() => {
    getPageData(pageId, active, dispatch);
  }, [pageId, active, dispatch]);

  return (
    <Container className="pt-5" fluid="xl">
      {page.length > 0 ? renderTable(page) : renderLoading()}
      <PaginationBar />
    </Container>
  );
};

const getPageData = (pageId, active, dispatch) => {
  if (pageId) {
    //url page number exists
    const pageNum = parseInt(pageId, 10);
    if (pageNum !== active) {
      //url page is not active
      dispatch(setActive(pageNum));
      dispatch(fetchPage(pageNum));
    } else {
      //url page number exists and is active
      dispatch(fetchPage(active));
    }
  } else {
    //home page
    dispatch(fetchPage(active));
  }
};

const renderLoading = () => {
  return <div className="mt-5">{renderPlaceholders()}</div>;
};

const renderPlaceholders = () => {
  let placeholders = [];
  for (let i = 0; i <= 50; i++) {
    placeholders.push(
      <Placeholder as="div" animation="glow" className="py-3">
        <Placeholder xs={12} size="lg" />
      </Placeholder>
    );
  }
  return placeholders;
};

const renderTable = (page) => {
  return (
    <Table responsive="xl" hover>
      {renderHead()}
      {renderBody(page)}
    </Table>
  );
};

const renderHead = () => {
  return (
    <thead className="sticky-top">
      <tr>
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
};

const renderBody = (page) => {
  return (
    <tbody>
      {page.map((coin) => {
        return (
          <tr key={coin.id} height={68}>
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
};

export default CryptoList;
