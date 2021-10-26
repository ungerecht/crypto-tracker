import React from "react";
import { Col, Row, Card, ListGroup } from "react-bootstrap";
import { formatSupply } from "../helpers";
import { formatCurrency } from "@coingecko/cryptoformat";

const Stats = ({ coin }) => {
  return renderStats(coin);
};

const renderStats = (coin) => {
  return (
    <Card className="mt-3 bg-light" border="light">
      <Card.Body className="fw-bold">
        <Card.Title className="fw-bold">{coin.name} Statistics</Card.Title>
        <ListGroup variant="flush">
          {renderStatsItem("Market Cap", coin.market_data.market_cap.usd, true)}
          {renderStatsItem("24 Hour Trading Volume", coin.volume_24h, true)}
          {renderStatsItem(
            "Fully Diluted Valuation",
            coin.market_data.fully_diluted_valuation.usd,
            true
          )}
          {renderStatsItem(
            "Circulating Supply",
            coin.market_data.circulating_supply,
            false
          )}
          {renderStatsItem(
            "Total Supply",
            coin.market_data.total_supply,
            false
          )}
          {renderStatsItem("Max Supply", coin.market_data.max_supply, false)}
          {renderStatsItem("All Time High", coin.market_data.ath.usd, true)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

const renderStatsItem = (title, data, isCurrency) => {
  if (data !== undefined)
    return (
      <ListGroup.Item className="bg-light">
        <Row className="flex-nowrap">
          <Col className="d-flex data-label text-muted text-nowrap px-0">
            {title}
          </Col>
          <Col className="d-flex justify-content-end px-0">
            {isCurrency
              ? formatCurrency(data, "USD", "en")
              : formatSupply(data)}
          </Col>
        </Row>
      </ListGroup.Item>
    );
};

export default Stats;
