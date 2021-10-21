import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetail } from "../actions";
import {
  Card,
  Container,
  Row,
  Col,
  Badge,
  ProgressBar,
  ListGroup,
} from "react-bootstrap";
import { upIcon, downIcon } from "../icons";
import { formatPercentage, formatSupply } from "../helpers";
import { formatCurrency } from "@coingecko/cryptoformat";
import "../styles/CryptoDetail.css";

const CryptoDetail = (props) => {
  const { coin } = useSelector((state) => state.coin);
  const dispatch = useDispatch();
  const coinId = props.match.params.id;

  useEffect(() => {
    dispatch(fetchCoinDetail(coinId));
  }, [dispatch, coinId]);
  console.log(coin);

  if (coin.id) {
    return (
      <Container fluid="lg">
        <Row className="my-5">
          {renderInfo(coin)}
          {renderPrice(coin)}
        </Row>
        {renderData(coin)}
        <Card></Card>
      </Container>
    );
  } else {
    return <div></div>;
  }
};

const renderInfo = (coin) => {
  return (
    <Col className="flex-column h6">
      <span className="d-flex align-items-center">
        <img
          src={coin.image.large}
          width="36px"
          alt={coin.name + " icon"}
          className="me-3"
        />
        <h1 className="mb-1">{coin.name}</h1>
        <h4 className="mb-0 ms-3 text-muted">{coin.symbol.toUpperCase()}</h4>
      </span>
      <Badge className="bg-dark p-2 my-2">{`Rank #${coin.market_cap_rank}`}</Badge>
    </Col>
  );
};

const renderPrice = (coin) => {
  return (
    <Col className="flex-column price-column">
      <span className="h6">{`${
        coin.name
      } price (${coin.symbol.toUpperCase()})`}</span>
      <br />
      <span className="d-flex align-items-center h4">
        <span className="h1 mb-1">
          {formatCurrency(coin.market_data.current_price.usd, "USD", "en")}
        </span>
        <Badge
          className="d-flex align-items-center p-2 ms-3"
          style={{
            background:
              coin.market_data.price_change_percentage_24h >= 0
                ? "limegreen"
                : "red",
          }}
        >
          {coin.market_data.price_change_percentage_24h >= 0
            ? upIcon
            : downIcon}
          {formatPercentage(coin.market_data.price_change_percentage_24h)}
        </Badge>
      </span>
      <span className="d-flex justify-content-center">
        <span className="fw-bold text-muted range-text">24 Hour Range</span>
      </span>
      <span className="d-flex align-items-center">
        <span className="d-flex fw-bold text-muted pe-2 range-text">
          {formatCurrency(coin.market_data.low_24h.usd, "USD", "en")}
        </span>
        <ProgressBar
          min={0}
          max={coin.market_data.high_24h.usd - coin.market_data.low_24h.usd}
          now={
            coin.market_data.high_24h.usd -
            coin.market_data.low_24h.usd -
            (coin.market_data.high_24h.usd - coin.market_data.current_price.usd)
          }
          variant="info"
          style={{ height: "10px", width: "500px" }}
        />
        <span className="d-flex fw-bold text-muted ps-2 range-text">
          {formatCurrency(coin.market_data.high_24h.usd, "USD", "en")}
        </span>
      </span>
    </Col>
  );
};

const renderData = (coin) => {
  return (
    <Row>
      <Col>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col className="d-flex data-label text-muted fw-bold">
                Market Cap
              </Col>
              <Col className="d-flex justify-content-end">
                {formatCurrency(coin.market_data.market_cap.usd, "USD", "en")}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col className="d-flex data-label text-muted fw-bold">
                24 Hour Trading Volume
              </Col>
              <Col className="d-flex justify-content-end">
                {formatCurrency(coin.volume_24h, "USD", "en")}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col className="d-flex data-label text-muted fw-bold">
                Fully Diluted Valuation
              </Col>
              <Col className="d-flex justify-content-end">
                {formatCurrency(
                  coin.market_data.fully_diluted_valuation.usd,
                  "USD",
                  "en"
                )}
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col className="d-flex data-label text-muted fw-bold">
                Circulating Supply
              </Col>
              <Col className="d-flex justify-content-end">
                {formatSupply(coin.market_data.circulating_supply)}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col className="d-flex data-label text-muted fw-bold">
                Total Supply
              </Col>
              <Col className="d-flex justify-content-end">
                {formatSupply(coin.market_data.total_supply)}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col className="d-flex data-label text-muted fw-bold">
                Max Supply
              </Col>
              <Col className="d-flex justify-content-end">
                {formatSupply(coin.market_data.max_supply)}
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

const renderDataItem = () => {};

export default CryptoDetail;
